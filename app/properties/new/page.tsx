"use client";

import { useState } from "react";

export default function NewPropertyPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    price: "",
    type: "中古マンション",
    area: "",
    layout: "",
    year: "",
    managementFee: "",
    repairFee: "",
    status: "公開中",
    notes: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  try {
    const response = await fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "登録に失敗しました");
    }

    alert("物件を登録しました！");

    window.location.href = "/properties";
  } catch (error) {
    console.error("登録エラー:", error);
    alert("物件の登録に失敗しました。");
  }
};

  return (
    <main className="property-form-page">
      <div className="property-form-header">
        <div>
          <h1>新規物件登録</h1>
          <p>新しい物件情報を登録します。</p>
        </div>

        <a href="/properties" className="back-button">
          ← 物件一覧へ戻る
        </a>
      </div>

      <form
        className="property-form"
        onSubmit={handleSubmit}
      >
        {/* 基本情報 */}
        <section className="form-section">
          <div className="form-section-title">
            <h2>基本情報</h2>
            <p>物件の基本的な情報を入力してください。</p>
          </div>

          <div className="form-grid">
            <div className="form-group full">
              <label htmlFor="name">
                物件名 <span>*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="例：小岩レジデンス"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label htmlFor="address">
                所在地 <span>*</span>
              </label>

              <input
                id="address"
                name="address"
                type="text"
                placeholder="例：東京都江戸川区小岩1-1-1"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">
                価格 <span>*</span>
              </label>

              <input
                id="price"
                name="price"
                type="text"
                placeholder="例：4,980万円"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">
                物件種別 <span>*</span>
              </label>

              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option>中古マンション</option>
                <option>新築マンション</option>
                <option>中古戸建</option>
                <option>新築戸建</option>
                <option>土地</option>
                <option>事業用物件</option>
              </select>
            </div>
          </div>
        </section>

        {/* 物件詳細 */}
        <section className="form-section">
          <div className="form-section-title">
            <h2>物件詳細</h2>
            <p>面積・間取り・築年などを入力してください。</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="area">
                専有面積
              </label>

              <div className="input-with-unit">
                <input
                  id="area"
                  name="area"
                  type="text"
                  placeholder="例：68.52"
                  value={form.area}
                  onChange={handleChange}
                />
                <span>㎡</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="layout">
                間取り
              </label>

              <select
                id="layout"
                name="layout"
                value={form.layout}
                onChange={handleChange}
              >
                <option value="">選択してください</option>
                <option>1R</option>
                <option>1K</option>
                <option>1DK</option>
                <option>1LDK</option>
                <option>2DK</option>
                <option>2LDK</option>
                <option>3DK</option>
                <option>3LDK</option>
                <option>4LDK</option>
                <option>5LDK以上</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">
                築年
              </label>

              <input
                id="year"
                name="year"
                type="text"
                placeholder="例：2020年"
                value={form.year}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* 費用 */}
        <section className="form-section">
          <div className="form-section-title">
            <h2>費用情報</h2>
            <p>マンションの場合は管理費などを入力してください。</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="managementFee">
                管理費
              </label>

              <div className="input-with-unit">
                <input
                  id="managementFee"
                  name="managementFee"
                  type="text"
                  placeholder="例：15,000"
                  value={form.managementFee}
                  onChange={handleChange}
                />
                <span>円/月</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="repairFee">
                修繕積立金
              </label>

              <div className="input-with-unit">
                <input
                  id="repairFee"
                  name="repairFee"
                  type="text"
                  placeholder="例：12,000"
                  value={form.repairFee}
                  onChange={handleChange}
                />
                <span>円/月</span>
              </div>
            </div>
          </div>
        </section>

        {/* 状態・備考 */}
        <section className="form-section">
          <div className="form-section-title">
            <h2>公開設定</h2>
            <p>物件の公開状態と備考を設定します。</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="status">
                ステータス
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>公開中</option>
                <option>非公開</option>
                <option>契約済み</option>
              </select>
            </div>

            <div className="form-group full">
              <label htmlFor="notes">
                備考
              </label>

              <textarea
                id="notes"
                name="notes"
                rows={5}
                placeholder="物件に関するメモや注意事項など"
                value={form.notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* 操作按钮 */}
        <div className="form-actions">
          <a href="/properties" className="cancel-button">
            キャンセル
          </a>

          <button type="submit" className="save-button">
            物件を登録する
          </button>
        </div>
      </form>
    </main>
  );
}