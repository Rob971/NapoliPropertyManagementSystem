"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "@/i18n/i18n-provider";
import type { Property } from "@/types";
import { MessageCircle } from "lucide-react";

interface WhatsAppDispatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property | null;
  onAccept: () => void;
  onDecline: () => void;
}

export function WhatsAppDispatchDialog({
  open,
  onOpenChange,
  property,
  onAccept,
  onDecline,
}: WhatsAppDispatchDialogProps) {
  const { t } = useTranslations();

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-0 p-0 sm:max-w-md" showCloseButton>
        <div className="bg-[#075e54] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#25d366]">
              <MessageCircle className="size-5" />
            </div>
            <div>
              <DialogHeader className="text-left">
                <DialogTitle className="text-base text-white">
                  {t("whatsapp.title")}
                </DialogTitle>
                <DialogDescription className="text-emerald-100">
                  {t("whatsapp.subtitle")}
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-[#e5ddd5] p-4">
          <div className="max-w-[90%] rounded-lg rounded-tl-none bg-white p-3 shadow-sm">
            <p className="text-sm leading-relaxed text-slate-800">
              {t("whatsapp.message", { property: property.name })}
            </p>
            <p className="mt-2 text-[10px] text-slate-400">{t("whatsapp.timestamp")}</p>
          </div>

          <DialogFooter className="flex-col gap-2 border-0 bg-transparent p-0 sm:flex-row">
            <Button
              className="w-full bg-[#25d366] text-white hover:bg-[#1ebe57] sm:flex-1"
              onClick={onAccept}
            >
              {t("whatsapp.accept")}
            </Button>
            <Button
              variant="outline"
              className="w-full border-rose-200 bg-white text-rose-600 hover:bg-rose-50 sm:flex-1"
              onClick={onDecline}
            >
              {t("whatsapp.decline")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
