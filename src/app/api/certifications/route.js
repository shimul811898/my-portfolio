import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const certs = await db
      .collection("certifications")
      .find({})
      .sort({ order: 1, _id: -1 })
      .toArray();

    const formattedCerts = certs.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return Response.json({ success: true, certifications: formattedCerts });
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return Response.json(
      { success: false, error: "Failed to fetch certifications" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await db.collection("certifications").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      insertedId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error creating certification:", error);
    return Response.json(
      { success: false, error: "Failed to create certification" },
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
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    await db.collection("certifications").deleteOne({ _id: new ObjectId(id) });
    return Response.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return Response.json(
      { success: false, error: "Failed to delete certification" },
      { status: 500 }
    );
  }
}
