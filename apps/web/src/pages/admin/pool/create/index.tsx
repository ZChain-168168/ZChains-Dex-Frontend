import PoolCreate from 'views/Admin/Pool/PoolCreate'
import AdminLayout from 'components/Admin/Layout'

const AdminCreatePool = () => {
  return <PoolCreate />
}

AdminCreatePool.mp = true
AdminCreatePool.Layout = AdminLayout
export default AdminCreatePool
