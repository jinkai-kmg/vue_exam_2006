import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import Layout from '../views/Layout.vue'
import MedicalCombo from '../views/MedicalCombo.vue'// 体检套餐管理
import MedicalTerm from '../views/MedicalTerm.vue'// 体检项管理
import MedicalOrganization from '../views/MedicalOrganization.vue'// 体检机构管理
import InstitutionalIndicators from '../views/InstitutionalIndicators.vue'// 机构指标管理
import Criterion from '../views/Criterion.vue'// 标准指标管理
import BookingInformation from '../views/BookingInformation.vue'// 预约信息查询

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'Layout',
    component: Layout,
    children:[
      // 体检套餐管理
      {
        path: '/admin/medicalcombo',
        name: 'MedicalCombo',
        component: MedicalCombo
      },
      // 体检项管理
      {
        path: '/admin/medicalterm',
        name: 'MedicalTerm',
        component: MedicalTerm
      },
      // 体检机构管理
      {
        path: '/admin/medicalorganization',
        name: 'MedicalOrganization',
        component: MedicalOrganization
      },
      // 机构指标管理
      {
        path: '/admin/institutionalindicators',
        name: 'InstitutionalIndicators',
        component: InstitutionalIndicators
      },
      // 标准指标管理
      {
        path: '/admin/criterion',
        name: 'Criterion',
        component: Criterion
      },
      // 预约信息查询
      {
        path: '/admin/bookinginformation',
        name: 'BookingInformation',
        component: BookingInformation
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
