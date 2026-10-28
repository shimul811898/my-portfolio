import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    // For public visitors: show only projects where isVisible is not false
    // For admin with ?all=true: return all projects
    const query = showAll ? {} : { isVisible: { $ne: false } };

    const projects = await db
      .collection("projects")
      .find(query)
      .sort({ order: 1, _id: 1 })
      .toArray();

    const formattedProjects = projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      isVisible: project.isVisible !== false,
    }));

    return Response.json({ success: true, projects: formattedProjects });
  } catch (error) {
    console.error("Error fetching projects from MongoDB:", error);
    return Response.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await db.collection("projects").insertOne({
      ...body,
      isVisible: body.isVisible !== undefined ? body.isVisible : true,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      insertedId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error creating project in MongoDB:", error);
    return Response.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, isVisible, order, bulkAction, limit } = body;

    // Bulk actions: show top N, show all, hide all
    if (bulkAction === "set_limit" && typeof limit === "number") {
      const allProjects = await db
        .collection("projects")
        .find({})
        .sort({ order: 1, _id: 1 })
        .toArray();

      for (let i = 0; i < allProjects.length; i++) {
        const shouldShow = i < limit;
        await db
          .collection("projects")
          .updateOne({ _id: allProjects[i]._id }, { $set: { isVisible: shouldShow } });
      }

      return Response.json({
        success: true,
        message: `Updated to show top ${limit} projects on website.`,
      });
    }

    if (bulkAction === "show_all") {
      await db.collection("projects").updateMany({}, { $set: { isVisible: true } });
      return Response.json({ success: true, message: "All projects are now visible on website." });
    }

    if (!id) {
      return Response.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    const updateFields = {};
    if (typeof isVisible === "boolean") {
      updateFields.isVisible = isVisible;
    }
    if (typeof order === "number") {
      updateFields.order = order;
    }

    await db
      .collection("projects")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    return Response.json({ success: true, message: "Project updated" });
  } catch (error) {
    console.error("Error updating project in MongoDB:", error);
    return Response.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return Response.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    await db.collection("projects").deleteOne({ _id: new ObjectId(id) });
    return Response.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return Response.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
