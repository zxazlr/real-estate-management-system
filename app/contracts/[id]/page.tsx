"use client";

import { useEffect, useState } from "react";

export default function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const { id } = await params;

        const response = await fetch(`/api/contracts/${id}`);

        if (!response.ok) {
          throw new Error("契約の取得に失敗しました");
        }

        const data = await response.json();

        setContract(data);
      } catch (error) {
        console.error("契約詳細取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [params]);

  if (loading) {
    return (
      <main className="properties-page">
        <div className="properties-content">
          <p>契約情報を読み込んでいます...</p>
        </div>
      </main>
    );
  }

  if (!contract) {
    return (
      <main className="properties-page">
        <div className="properties-content">
          <h2>契約が見つかりませんでした</h2>

          <button
            className="detail-button"
            onClick={() => {
              window.location.href = "/contracts";
            }}
          >
            ← 契約一覧へ戻る
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>契約詳細</h1>
          <p>{contract.contractCode}</p>
        </div>

        <div className="detail-actions">
          <button
            className="detail-button"
            onClick={() => {
              window.location.href = "/contracts";
            }}
          >
            ← 契約一覧へ戻る
          </button>

          <button
            className="add-button"
            onClick={() => {
              window.location.href = `/contracts/${contract.id}/edit`;
            }}
          >
            編集する
          </button>
          <button
            className="delete-button"
            onClick={async () => {
            const confirmed = window.confirm(
                "この契約を削除してもよろしいですか？\n削除したデータは元に戻せません。"
            );

            if (!confirmed) {
                return;
            }

            try {
                const response = await fetch(
                `/api/contracts/${contract.id}`,
                {
                    method: "DELETE",
                }
                );

                const data = await response.json();

                if (!response.ok) {
                throw new Error(
                    data.error || "契約の削除に失敗しました"
                );
                }

                alert("契約を削除しました！");

                window.location.href = "/contracts";
            } catch (error) {
                console.error("契約削除エラー:", error);

                alert("契約の削除に失敗しました。");
            }
            }}
        >
            削除する
        </button>
        </div>
      </div>

      <section className="properties-content">
        <div className="property-detail-card">
          <h2>契約情報</h2>

          <div className="property-detail-grid">
            <div>
              <span>契約番号</span>
              <strong>{contract.contractCode}</strong>
            </div>

            <div>
              <span>契約金額</span>
              <strong>{contract.contractPrice}</strong>
            </div>

            <div>
              <span>契約日</span>
              <strong>
                {new Date(
                  contract.contractDate
                ).toLocaleDateString("ja-JP")}
              </strong>
            </div>

            <div>
              <span>ステータス</span>
              <strong>{contract.status}</strong>
            </div>
          </div>
        </div>

        <div className="property-detail-card">
          <h2>顧客情報</h2>

          <div className="property-detail-grid">
            <div>
              <span>顧客名</span>
              <strong>{contract.customer.name}</strong>
            </div>

            <div>
              <span>顧客番号</span>
              <strong>
                {contract.customer.customerCode}
              </strong>
            </div>

            <div>
              <span>電話番号</span>
              <strong>{contract.customer.phone}</strong>
            </div>

            <div>
              <span>メール</span>
              <strong>
                {contract.customer.email || "未登録"}
              </strong>
            </div>
          </div>
        </div>

        <div className="property-detail-card">
          <h2>物件情報</h2>

          <div className="property-detail-grid">
            <div>
              <span>物件名</span>
              <strong>{contract.property.name}</strong>
            </div>

            <div>
              <span>物件番号</span>
              <strong>
                {contract.property.propertyCode}
              </strong>
            </div>

            <div>
              <span>住所</span>
              <strong>{contract.property.address}</strong>
            </div>

            <div>
              <span>物件価格</span>
              <strong>{contract.property.price}</strong>
            </div>
          </div>
        </div>

        <div className="property-detail-card">
          <h2>備考</h2>

          <p>
            {contract.notes || "備考はありません。"}
          </p>
        </div>
      </section>
    </main>
  );
}