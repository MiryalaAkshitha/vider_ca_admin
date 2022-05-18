import { List, Box } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useState } from "react";
import Divider from '@mui/material/Divider';
import { icons } from "assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const [Billingopen, setBillingOpen] = useState(false);
	const [BillingEntityopen, setBillingEntityOpen] = useState(false);

	const navigate = useNavigate();

	const handleBillingClick = () => {
		setBillingOpen(!Billingopen);
	};

	const handleBillingEntitiesClick = () => {
		setBillingEntityOpen(!BillingEntityopen);
	};

	const handleEstimatesClick = () => {
		navigate("/invoicing/estimates")
	}

	const handleClientsClick = () => {
		navigate("/invoicing/clients")
	}


	const handleReceiptsClick = () => {
		navigate("/invoicing/receipts")
	};

	const handleDashboardClick = () => {
		navigate("/invoicing/dashboard")
	};

	const handleInvoicesClick = () => {
		navigate("/invoicing/invoices")
	}
	return (

		<Box display="flex">
			<List
				sx={{ width: "100%", bgcolor: "background.paper", borderRight: "1px solid #2222221A", height: "100vh" }}
				component="nav"
			>
				<Box>
					<ListItemButton onClick={handleDashboardClick}>
						<img src={icons.user} alt="" width={20} style={{ marginRight: "30px" }} />
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				</Box>
				<Divider variant="inset" component="li" />
				<ListItemButton onClick={handleClientsClick}>
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText primary="Clients" />
				</ListItemButton>
				<Divider variant="inset" component="li" />
				<ListItemButton onClick={handleBillingClick}>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="Billing" />
					{Billingopen ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={Billingopen} timeout="auto" >
					<List component="div" disablePadding>
						<ListItemButton sx={{ pl: 4 }} onClick={handleEstimatesClick}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary="Estimates" />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }} onClick={handleInvoicesClick}>
							<ListItemIcon>
								<DraftsIcon />
							</ListItemIcon>
							<ListItemText primary="Invoices" />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }} onClick={handleReceiptsClick}>
							<ListItemIcon>
								<DraftsIcon />
							</ListItemIcon>
							<ListItemText primary="Receipts" />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary="Recurring Invoices" />
						</ListItemButton>
					</List>
				</Collapse>
				<Divider variant="inset" component="li" />
				<ListItemButton onClick={handleBillingEntitiesClick}>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="Billing Entities" />
					{BillingEntityopen ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={BillingEntityopen} timeout="auto" >
					<List component="div" disablePadding>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary="Sai veer" />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<DraftsIcon />
							</ListItemIcon>
							<ListItemText primary="Venkat" />
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</Box>
	);
}
export default Dashboard;