import { AppSidebar } from './nav/app-sidebar';
import { SidebarProvider } from './ui/sidebar';

interface Props {
	defaultSidebarOpen: boolean;
	url: URL;
	className?: string;
	appName: string;
}

export default function Page(props: Props) {
	return (
		<SidebarProvider defaultOpen={props.defaultSidebarOpen} className="!w-fit">
			<AppSidebar appName={props.appName} />
		</SidebarProvider>
	);
}
