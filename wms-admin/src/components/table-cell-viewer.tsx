import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef } from "react";
import type { userSchema } from "../schema/users-schema";

export function TableCellViewer({
  item,
  onSubmitRowData,
}: {
  item: z.infer<typeof userSchema>;
  onSubmitRowData: (item: z.infer<typeof userSchema>) => void;
}) {
  const isMobile = useIsMobile();

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form ref={formRef} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="ID">ID</Label>
              <Input id="ID" defaultValue={item.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={
                    item.docstatus.toString()
                      ? item.docstatus.toString()
                      : "unset"
                  }
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Draft</SelectItem>
                    <SelectItem value="1">Submitted</SelectItem>
                    <SelectItem value="2">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={item.email} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" defaultValue={item.full_name} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" defaultValue={item.last_name} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" defaultValue={item.first_name} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="user_type">User Type</Label>
              <Select defaultValue={item.user_type}>
                <SelectTrigger id="user_type" className="w-full">
                  <SelectValue placeholder="Select a user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="System User">System User</SelectItem>
                  <SelectItem value="Website User">Website User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button onClick={() => onSubmitRowData(formRef.current?.formData)}>
            Submit
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
