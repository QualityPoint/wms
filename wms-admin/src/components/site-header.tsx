import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreateUser } from "./create-user";

export function SiteHeader({ PageName }: { PageName: string }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{PageName}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger className="cursor-pointer">
              Create User
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create User</DialogTitle>
              <DialogDescription>
                Fill in the form to create a new user
              </DialogDescription>
              <CreateUser />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
