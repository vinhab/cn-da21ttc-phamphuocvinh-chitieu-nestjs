import { NavLink } from 'react-router-dom';

interface SidebarProps {
	isSidebarHidden: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarHidden }) => {
	return (
		<section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
			<NavLink to="/home" className="brand">
				<i className="bx bxs-wallet icon mb-1"></i> CCCN
			</NavLink>
			<ul className="side-menu h-16">
				<li>
					<NavLink
						to="/home"
						className={({ isActive }) => isActive ? 'active' : ''}
					>
						<i className="bx bxs-dashboard icon"></i> Tổng quan
					</NavLink>
				</li>
				<li className="divider" data-text="main">Giao dịch</li>
				
				<li>
					<NavLink
						to="/categories"
						className={({ isActive }) => isActive ? 'active' : ''}
					>
						<i className='bx bxs-category icon'></i> Danh mục chi tiêu
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/expenses"
						className={({ isActive }) => isActive ? 'active' : ''}
					>
						<i className='bx bx-cart icon'></i> Chi tiêu
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/sources"
						className={({ isActive }) => isActive ? 'active' : ''}
					>
						<i className='bx bxs-credit-card-alt icon'></i> Nguồn thu nhập
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/incomes"
						className={({ isActive }) => isActive ? 'active' : ''}
					>
						<i className='bx bx-money icon'></i> Thu nhập
					</NavLink>
				</li>
				<li className="divider" data-text="table and forms">Tiết kiệm</li>
				<li>
				<NavLink
						to="/savings"
						className={({ isActive }) => isActive ? 'active' : ''}
					>
						<i className="bx bxs-dashboard icon"></i> Tiết kiệm
					</NavLink>
				</li>
			</ul>
		</section>
	);
};

export default Sidebar;