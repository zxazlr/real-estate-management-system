export default function Dashboard() {
  return (
    <main className="dashboard-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">R</div>
          <div>
            <strong>REAL ESTATE</strong>
            <span>Management</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="/dashboard" className="nav-item active">
            <span>▦</span>
            Dashboard
          </a>

          <a href="#" className="nav-item">
            <span>⌂</span>
            Properties
          </a>

          <a href="#" className="nav-item">
            <span>♙</span>
            Customers
          </a>

          <a href="#" className="nav-item">
            <span>✉</span>
            Inquiries
          </a>

          <div className="nav-section">SYSTEM</div>

          <a href="#" className="nav-item">
            <span>⚙</span>
            Settings
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="user-avatar">A</div>
            <div>
              <strong>Admin User</strong>
              <span>Administrator</span>
            </div>
          </div>

          <a href="/" className="logout">
            ← Sign out
          </a>
        </div>
      </aside>

      {/* Main content */}
      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="breadcrumb">Management / Dashboard</p>
            <h1>Dashboard</h1>
          </div>

          <div className="header-right">
            <button className="notification">♧</button>

            <div className="header-user">
              <div className="user-avatar">A</div>
              <span>Admin User</span>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">⌂</div>
            <div>
              <span>Total Properties</span>
              <strong>128</strong>
              <small>+12 this month</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">♙</div>
            <div>
              <span>Total Customers</span>
              <strong>356</strong>
              <small>+24 this month</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✉</div>
            <div>
              <span>New Inquiries</span>
              <strong>18</strong>
              <small>5 need attention</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">¥</div>
            <div>
              <span>Monthly Revenue</span>
              <strong>¥8.4M</strong>
              <small>+8.2% from last month</small>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <section className="dashboard-grid">
          <div className="panel properties-panel">
            <div className="panel-header">
              <div>
                <h2>Recent Properties</h2>
                <p>Recently added properties</p>
              </div>

              <a href="#">View all →</a>
            </div>

            <div className="property-list">
              <div className="property-row">
                <div className="property-image">PHOTO</div>

                <div className="property-info">
                  <strong>Modern Apartment in Koiwa</strong>
                  <span>Edogawa-ku, Tokyo</span>
                </div>

                <div className="property-price">¥48,000,000</div>

                <span className="status available">Available</span>
              </div>

              <div className="property-row">
                <div className="property-image">PHOTO</div>

                <div className="property-info">
                  <strong>Family House</strong>
                  <span>Ichikawa, Chiba</span>
                </div>

                <div className="property-price">¥36,800,000</div>

                <span className="status pending">Pending</span>
              </div>

              <div className="property-row">
                <div className="property-image">PHOTO</div>

                <div className="property-info">
                  <strong>Luxury Residence</strong>
                  <span>Shinjuku-ku, Tokyo</span>
                </div>

                <div className="property-price">¥92,000,000</div>

                <span className="status available">Available</span>
              </div>
            </div>
          </div>

          <div className="panel inquiries-panel">
            <div className="panel-header">
              <div>
                <h2>Recent Inquiries</h2>
                <p>Latest customer inquiries</p>
              </div>

              <a href="#">View all →</a>
            </div>

            <div className="inquiry-list">
              <div className="inquiry-row">
                <div className="customer-avatar">Y</div>

                <div className="inquiry-info">
                  <strong>Yuki Tanaka</strong>
                  <span>Interested in Modern Apartment</span>
                  <small>10 minutes ago</small>
                </div>
              </div>

              <div className="inquiry-row">
                <div className="customer-avatar">K</div>

                <div className="inquiry-info">
                  <strong>Kenta Sato</strong>
                  <span>Asked about Family House</span>
                  <small>1 hour ago</small>
                </div>
              </div>

              <div className="inquiry-row">
                <div className="customer-avatar">M</div>

                <div className="inquiry-info">
                  <strong>Mai Suzuki</strong>
                  <span>Requested a property viewing</span>
                  <small>3 hours ago</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}