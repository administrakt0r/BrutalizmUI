"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerCancelDemo() {
  return (
    <Button
      onClick={() =>
        toast("Event has been created", {
          cancel: {
            label: "Cancel",
            onClick: () => toast("Action Cancelled"),
          },
        })
      }
    >
      Cancel
    </Button>
  )
}
