// React
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'
// Layout
import RootLayout from './layout/RootLayout';
// Pages
import Buy from './pages/Buy';
import SalesLayout from './layout/SalesLayout';
import SalesHistory from './pages/SalesHistory';
import SalesSummary from './pages/SalesSummary';
import DiscountedSales from './pages/DiscountedSales';
import SalesReports from './pages/SalesReports';
// // CSS
// import "./css/output.css"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<Buy />} />
        <Route path='sales' element={<SalesLayout />}>
          <Route index element={<SalesSummary />} />
          <Route path='sales-history' element={<SalesHistory />} />
          <Route path='discounted-sales' element={<DiscountedSales />} />
        </Route>
        <Route path='sales-reports' element={<SalesReports />} />
  </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
