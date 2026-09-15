"use client";

import { useEffect, useState } from "react";

export default function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    status: "対応中",
    notes: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { id } = await params;
        setCustomerId(id);

        const response = await fetch(
          `/api/customers/${id}`
        );

        if (!response.ok) {
          throw new Error("顧客の取得に失敗しました");
        }

        const data = await response.json();

        setForm({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          status: data.status || "対応中",
          notes: data.notes || "",
        });
      } catch (error) {
        console.error("顧客取得エラー:", error);
        alert("顧客情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [params]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `/api/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "顧客の更新に失敗しました"
        );
      }

      alert("顧客情報を更新しました！");

      window.location.href = `/customers/${customerId}`;
    } catch (error) {
      console.error("顧客更新エラー:", error);
      alert("顧客情報の更新に失敗しました。");
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

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>顧客情報編集</h1>
          <p>顧客情報を編集します。</p>
        </div>

        <button
          className="detail-button"
          onClick={() => {
            window.location.href = `/customers/${customerId}`;
          }}
        >
          ← 詳細へ戻る
        </button>
      </div>

      <section className="new-property-content">
        <form
          className="property-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>顧客名</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>電話番号</label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>メールアドレス</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>住所</label>

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>ステータス</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="対応中">対応中</option>
              <option value="成約">成約</option>
              <option value="終了">終了</option>
            </select>
          </div>

          <div className="form-group">
            <label>備考</label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="detail-button"
              onClick={() => {
                window.location.href = `/customers/${customerId}`;
              }}
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="add-button"
            >
              保存する
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}