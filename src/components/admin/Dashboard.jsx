import React, { useEffect, useState } from 'react';
import { apiUrl } from '../Http';
import Layout from '../Layout';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Sidebar from './Sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [topProducts, setTopProducts] = useState(null);
  const [showTopProducts, setShowTopProducts] = useState(false);

  const fetchOverview = async () => {
    try {
      const response = await fetch(`${apiUrl}/sales-revenue/overview`);
      if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu tổng quan.');
      const result = await response.json();
      setOverview(result);
    } catch (err) {
      setError(err.message);
    }
  };

  // const fetchFiltered = async () => {
  //   setLoading(true);
  //   setError('');
  //   setIsFiltered(true);
  //   try {
  //     const response = await fetch(`${apiUrl}/sales-revenue?start_date=${startDate}&end_date=${endDate}`);
  //     if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu theo ngày.');
  //     const result = await response.json();
  //     setFiltered(result.filtered || null);
  //     if (!result.filtered) {
  //       setError('Không có dữ liệu cho khoảng thời gian này.');
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchFiltered = async () => {
    setLoading(true);
    setError('');
    setIsFiltered(true);
    setShowTopProducts(false); // Ẩn sản phẩm bán chạy khi lọc lại
    try {
      const response = await fetch(`${apiUrl}/sales-revenue?start_date=${startDate}&end_date=${endDate}`);
      if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu theo ngày.');
      const result = await response.json();
      setFiltered(result.filtered || null);
      if (!result.filtered) {
        setError('Không có dữ liệu cho khoảng thời gian này.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTopProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/sales-revenue/top-products`);
      if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu sản phẩm bán chạy.');
      const result = await response.json();
      setTopProducts(result.topProducts || null);
      setShowTopProducts(true);
      if (!result.topProducts) {
        setError('Không có dữ liệu sản phẩm bán chạy.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const chartData = {
    labels: [isFiltered ? 'Lọc theo ngày' : 'Tổng Doanh Thu Các Năm'],
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: [isFiltered && filtered ? filtered.revenue : overview?.totalRevenue || 0],
        backgroundColor: ['#4fd1c5']
      }
    ]
  };

  const topProductsChartData = {
    labels: topProducts?.map(p => p.product_name) || [],
    datasets: [
      {
        label: 'Sản phẩm bán chạy',
        data: topProducts?.map(p => p.total_sold) || [],
        backgroundColor: ['#4fd1c5', '#ffbb33', '#ff5733']
      }
    ]
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 sidebar-dashboard">
            <Sidebar />
          </div>

          <div className="col-md-9 mt-4">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-700 pb-5">Báo Cáo Thống Kê</h1>

              {overview && (
                <div className="container-fluid">
                  <div className="row">
                    {[{
                      label: 'Tổng Đơn Hàng', value: overview.totalOrders, icon: 'shopping-cart', color: 'primary'
                    }, {
                      label: 'Tổng Sản Phẩm', value: overview.totalProducts, icon: 'box', color: 'success'
                    }, {
                      label: 'Tổng Khách Hàng', value: overview.totalUsers, icon: 'users', color: 'info'
                    }, {
                      label: 'Tổng Doanh Thu', value: overview.totalRevenue.toLocaleString() + ' VND', icon: 'dollar-sign', color: 'warning'
                    }].map((item, index) => (
                      <div className="col-xl-3 col-md-6 mb-4" key={index}>
                        <div className="card shadow-lg">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="mr-3">
                                <div className={`text-xs font-weight-bold text-${item.color} text-uppercase`}>{item.label}</div>
                                <div className="h5 font-weight-bold text-gray-800">{item.value}</div>
                              </div>
                              <i className={`fas fa-${item.icon} fa-2x text-gray-300`}></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 mb-5 d-flex justify-content-end gap-3 items-center">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control p-1 w-auto" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control p-1 w-auto" />
                <button onClick={fetchFiltered} className="btn btn-primary p-3">Lọc</button>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button onClick={fetchTopProducts} className="btn btn-success p-3">Xem Các Sản Phẩm Bán Chạy Nhất</button>
              </div>

              {loading && <p>Đang tải dữ liệu...</p>}
              {error && <p className="text-danger">{error}</p>}

              {!showTopProducts && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Biểu đồ doanh thu</h3>
                  <Bar className='chart-container mb-5' data={chartData} />
                </div>
              )}

              {topProducts && showTopProducts && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Biểu đồ sản phẩm bán chạy nhất</h3>
                  <Bar className='chart-container mb-5' data={topProductsChartData} />
                </div>
              )}

              {topProducts && showTopProducts && (
                <div className="mt-8 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-6 rounded-lg shadow-xl mb-5">
                  <h3 className="text-xl font-semibold text-white mb-4">Sản phẩm bán chạy</h3>
                  <div className="text-white">
                    {topProducts.map(product => (
                      <div key={product.product_id} className="mb-3">
                        <p><span className="font-semibold">ID:</span> {product.product_id}</p>
                        <p><span className="font-semibold">Tên:</span> {product.product_name}</p>
                        <p><span className="font-semibold">Số lượng bán:</span> {product.total_sold}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;