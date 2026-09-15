"use client";

import { useEffect, useState } from "react";

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { id } = await params;

        const response = await fetch(`/api/customers/${id}`);

        if (!response.ok) {
          throw new Error("顧客の取得に失敗しました");
        }

        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("顧客詳細取得エラー:", error);
        alert("顧客情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [params]);

  const handleDelete = async () => {
    if (!customer) {
      return;
    }

    const confirmed = window.confirm(
      "この顧客を削除してもよろしいですか？\n削除したデータは元に戻せません。"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/customers/${customer.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "顧客の削除に失敗しました"
        );
      }

      alert("顧客を削除しました！");

      window.location.href = "/customers";
    } catch (error) {
      console.error("顧客削除エラー:", error);
      alert("顧客の削除に失敗しました。");
    }
  };

  if (loading) {
    return (
      <main className="properties-page">
        <div className="properties-content">
          <p>顧客情報を読み込んでいます...</p>
        </div>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="properties-page">
        <div className="properties-content">
          <h1>顧客が見つかりません</h1>

          <button
            className="detail-button"
            onClick={() => {
              window.location.href = "/customers";
            }}
          >
            ← 顧客一覧へ戻る
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>{customer.name}</h1>
          <p>顧客番号：{customer.customerCode}</p>
        </div>

        <div className="detail-actions">
          <button
            className="detail-button"
            onClick={() => {
              window.location.href = "/customers";
            }}
          >
            ← 顧客一覧へ戻る
          </button>

          <button
            className="add-button"
            onClick={() => {
              window.location.href = `/customers/${customer.id}/edit`;
            }}
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

      <section className="property-detail-content">
        <div className="detail-card">
          <h2>顧客情報</h2>

          <div className="detail-grid">
            <div className="detail-item">
              <span>顧客番号</span>
              <strong>{customer.customerCode}</strong>
            </div>

            <div className="detail-item">
              <span>顧客名</span>
              <strong>{customer.name}</strong>
            </div>

            <div className="detail-item">
              <span>電話番号</span>
              <strong>{customer.phone}</strong>
            </div>

            <div className="detail-item">
              <span>メールアドレス</span>
              <strong>
                {customer.email || "未登録"}
              </strong>
            </div>

            <div className="detail-item">
              <span>住所</span>
              <strong>
                {customer.address || "未登録"}
              </strong>
            </div>

            <div className="detail-item">
              <span>ステータス</span>
              <strong>{customer.status}</strong>
            </div>

            <div className="detail-item">
              <span>登録日時</span>
              <strong>
                {new Date(customer.createdAt).toLocaleString(
                  "ja-JP"
                )}
              </strong>
            </div>

            <div className="detail-item">
              <span>更新日時</span>
              <strong>
                {new Date(customer.updatedAt).toLocaleString(
                  "ja-JP"
                )}
              </strong>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h2>備考</h2>

          <div className="notes-content">
            {customer.notes || "備考はありません。"}
          </div>
        </div>
      </section>
    </main>
  );
}