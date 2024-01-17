import CampaignsCreate from 'views/Admin/Campaigns/CampaignsCreate'
import AdminLayout from 'components/Admin/Layout'

const AdminCreateCampaigns = () => {
  return <CampaignsCreate />
}

AdminCreateCampaigns.mp = true
AdminCreateCampaigns.Layout = AdminLayout
export default AdminCreateCampaigns
