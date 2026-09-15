import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contractId = Number(id);

    if (Number.isNaN(contractId)) {
      return NextResponse.json(
        { error: "無効な契約IDです。" },
        { status: 400 }
      );
    }

    const contract = await prisma.contract.findUnique({
      where: {
        id: contractId,
      },
      include: {
        customer: true,
        property: true,
      },
    });

    if (!contract) {
      return NextResponse.json(
        { error: "契約が見つかりませんでした。" },
        { status: 404 }
      );
    }

    return NextResponse.json(contract);
  } catch (error) {
    console.error("契約詳細取得エラー:", error);

    return NextResponse.json(
      { error: "契約の取得に失敗しました。" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contractId = Number(id);

    if (Number.isNaN(contractId)) {
      return NextResponse.json(
        { error: "無効な契約IDです。" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const contract = await prisma.contract.update({
      where: {
        id: contractId,
      },
      data: {
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

    return NextResponse.json(contract);
  } catch (error) {
    console.error("契約更新エラー:", error);

    return NextResponse.json(
      { error: "契約の更新に失敗しました。" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contractId = Number(id);

    if (Number.isNaN(contractId)) {
      return NextResponse.json(
        { error: "無効な契約IDです。" },
        { status: 400 }
      );
    }

    const existingContract = await prisma.contract.findUnique({
      where: {
        id: contractId,
      },
    });

    if (!existingContract) {
      return NextResponse.json(
        { error: "契約が見つかりませんでした。" },
        { status: 404 }
      );
    }

    await prisma.contract.delete({
      where: {
        id: contractId,
      },
    });

    return NextResponse.json({
      message: "契約を削除しました。",
    });
  } catch (error) {
    console.error("契約削除エラー:", error);

    return NextResponse.json(
      { error: "契約の削除に失敗しました。" },
      { status: 500 }
    );
  }
}