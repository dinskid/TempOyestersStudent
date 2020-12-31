import { adminRoot } from './defaultValues';
import { GoDashboard } from 'react-icons/go';

const data = [
  {
    id: 'pages',
    icon: 'iconsminds-digital-drawing',
    label: 'All Courses',
    to: `${adminRoot}/pages/product/data-list`,
  },
  {
    id: 'pages-blog',
    icon: 'iconsminds-wifi',
    label: 'Live Sessions',
    to: `${adminRoot}/pages/product/Live_Session`,
  },
  {
    id: 'pages-product',
    icon: 'iconsminds-open-book',
    label: 'My Courses',
    to: `${adminRoot}/pages/mycourses`,
  },
  {
    id: 'pages-profile',
    icon: 'iconsminds-affiliate',
    label: 'Affiliate',
    to: `${adminRoot}/pages/profile/affiliate`,
  },

  {
    id: 'applications',
    icon: 'iconsminds-pen',
    label: 'Blogs',
    to: `${adminRoot}/pages/profile/blog`,
  },
];
export default data;
