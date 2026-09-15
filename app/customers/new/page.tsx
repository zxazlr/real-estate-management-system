"use client";

import { useState } from "react";

export default function NewCustomerPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    status: "対応中",
    notes: "",
  });

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
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "顧客の登録に失敗しました"
        );
      }

      alert("顧客を登録しました！");

      window.location.href = "/customers";
    } catch (error) {
      console.error("顧客登録エラー:", error);
      alert("顧客の登録に失敗しました。");
    }
  };

  return (
    <main className="properties-page">
      <div className="properties-header">
        <div>
          <h1>新規顧客登録</h1>
          <p>新しい顧客情報を登録します。</p>
        </div>

        <button
          className="detail-button"
          onClick={() => {
            window.location.href = "/customers";
          }}
        >
          ← 顧客一覧へ戻る
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
                window.location.href = "/customers";
              }}
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="add-button"
            >
              顧客を登録
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}