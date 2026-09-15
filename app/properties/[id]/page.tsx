
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();

  const handleDelete = async () => {
  const confirmed = window.confirm(
    "この物件を削除してもよろしいですか？\n削除したデータは元に戻せません。"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `/api/properties/${params.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "物件の削除に失敗しました"
      );
    }

    alert("物件を削除しました。");

    router.push("/properties");
  } catch (error) {
    console.error("物件削除エラー:", error);
    alert("物件の削除に失敗しました。");
  }
};
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `/api/properties/${params.id}`
        );

        if (!response.ok) {
          throw new Error("物件の取得に失敗しました");
        }

        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("物件取得エラー:", error);
        setError("物件情報を取得できませんでした。");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) {
    return (
      <main className="properties-page">
        <div className="properties-content">
          <p>読み込み中...</p>
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="properties-page">
        <div className="properties-content">
          <h2>物件が見つかりませんでした</h2>

          <button
            className="detail-button"
            onClick={() => router.push("/properties")}
          >
            物件一覧へ戻る
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>{property.name}</h1>
          <p>{property.propertyCode}</p>
        </div>

            <div className="detail-actions">
            <button
                className="detail-button"
                onClick={() => router.push("/properties")}
            >
                ← 物件一覧へ戻る
            </button>

            <button
                className="detail-button"
                onClick={() => router.push(`/properties/${property.id}/edit`)}
            >
                編集する
            </button>
              <button
                className="delete-button"
                onClick={handleDelete}
            >
                削除する
            </button>
            </div>
      </div>

      <section className="properties-content">
        <div className="property-detail-card">
          <div className="property-detail-header">
            <div>
              <h2>{property.name}</h2>

              <span
                className={`property-status ${
                  property.status === "公開中"
                    ? "published"
                    : "contracted"
                }`}
              >
                {property.status}
              </span>
            </div>

            <div className="property-detail-price">
              {property.price}
            </div>
          </div>

          <div className="property-detail-grid">
            <div className="property-detail-item">
              <span>物件番号</span>
              <strong>{property.propertyCode}</strong>
            </div>

            <div className="property-detail-item">
              <span>物件種別</span>
              <strong>{property.type}</strong>
            </div>

            <div className="property-detail-item">
              <span>所在地</span>
              <strong>{property.address}</strong>
            </div>

            <div className="property-detail-item">
              <span>専有面積</span>
              <strong>{property.area || "未登録"}</strong>
            </div>

            <div className="property-detail-item">
              <span>間取り</span>
              <strong>{property.layout || "未登録"}</strong>
            </div>

            <div className="property-detail-item">
              <span>築年</span>
              <strong>{property.year || "未登録"}</strong>
            </div>

            <div className="property-detail-item">
              <span>管理費</span>
              <strong>{property.managementFee || "未登録"}</strong>
            </div>

            <div className="property-detail-item">
              <span>修繕積立金</span>
              <strong>{property.repairFee || "未登録"}</strong>
            </div>
          </div>

          <div className="property-detail-notes">
            <h3>備考</h3>

            <p>
              {property.notes || "備考は登録されていません。"}
            </p>
          </div>

          <div className="property-detail-meta">
            <div>
              <span>登録日時</span>
              <strong>
                {new Date(property.createdAt).toLocaleString(
                  "ja-JP"
                )}
              </strong>
            </div>

            <div>
              <span>更新日時</span>
              <strong>
                {new Date(property.updatedAt).toLocaleString(
                  "ja-JP"
                )}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="related-contracts">
        <div className="related-contracts-header">
          <div>
            <h2>関連契約</h2>
            <p>この物件に関連する契約記録</p>
          </div>
        </div>

        {property.contracts && property.contracts.length > 0 ? (
          <div className="related-contracts-list">
            {property.contracts.map((contract: any) => (
              <div
                className="related-contract-item"
                key={contract.id}
              >
                <div className="related-contract-main">
                  <strong>{contract.contractCode}</strong>

                  <span>
                    顧客：{contract.customer.name}
                  </span>

                  <small>
                    契約日：
                    {new Date(
                      contract.contractDate
                    ).toLocaleDateString("ja-JP")}
                  </small>
                </div>

                <div className="related-contract-right">
                  <strong>{contract.contractPrice}</strong>

                  <span
                    className={`property-status ${
                      contract.status === "契約中"
                        ? "published"
                        : contract.status === "完了"
                          ? "contracted"
                          : ""
                    }`}
                  >
                    {contract.status}
                  </span>

                  <button
                    className="text-button"
                    onClick={() => {
                      router.push(
                        `/contracts/${contract.id}`
                      );
                    }}
                  >
                    詳細 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="related-contracts-empty">
            この物件にはまだ契約がありません。
          </div>
        )}
      </section>
    </main>
  );
}

