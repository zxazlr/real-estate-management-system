import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("物件取得エラー:", error);

    return NextResponse.json(
      { error: "物件の取得に失敗しました。" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const property = await prisma.property.create({
      data: {
        propertyCode: `RE-${Date.now()}`,
        name: body.name,
        address: body.address,
        price: body.price,
        type: body.type,
        area: body.area || null,
        layout: body.layout || null,
        year: body.year || null,
        managementFee: body.managementFee || null,
        repairFee: body.repairFee || null,
        status: body.status || "公開中",
        notes: body.notes || null,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("物件登録エラー:", error);

    return NextResponse.json(
      { error: "物件の登録に失敗しました。" },
      { status: 500 }
    );
  }
}