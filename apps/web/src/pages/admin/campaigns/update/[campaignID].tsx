import React from 'react'
import CampaignsUpdate from 'views/Admin/Campaigns/CampaignsUpdate'
import AdminLayout from 'components/Admin/Layout'

const AdminUpdateCampaigns = () => {
  return <CampaignsUpdate />
}

AdminUpdateCampaigns.mp = true
AdminUpdateCampaigns.Layout = AdminLayout
export default AdminUpdateCampaigns
