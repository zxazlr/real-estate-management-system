import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contracts = await prisma.contract.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
        property: true,
      },
    });

    return NextResponse.json(contracts);
  } catch (error) {
    console.error("契約取得エラー:", error);

    return NextResponse.json(
      { error: "契約の取得に失敗しました。" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const contract = await prisma.contract.create({
      data: {
        contractCode: `CT-${Date.now()}`,
        customerId: Number(body.customerId),
        propertyId: Number(body.propertyId),
        contractPrice: body.contractPrice,
        contractDate: new Date(body.contractDate),
        status: body.status || "契約中",
        notes: body.notes || null,
      },
      include: {
        customer: true,
        property: true,
      },
    });

    return NextResponse.json(contract, {
      status: 201,
    });
  } catch (error) {
    console.error("契約登録エラー:", error);

    return NextResponse.json(
      { error: "契約の登録に失敗しました。" },
      { status: 500 }
    );
  }
}