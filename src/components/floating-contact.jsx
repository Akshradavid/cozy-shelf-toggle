import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  const handleEmail = () => {
    window.location.href = "mailto:akshradavid@gmail.com";
  };

  const handleCall = () => {
    window.location.href = "tel:+919565341223";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919565341223", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Button
        onClick={handleEmail}
        size="icon"
        className="h-12 w-12 rounded-full shadow-warm bg-primary hover:bg-primary/90"
        aria-label="Send Email"
      >
        <Mail className="h-5 w-5" />
      </Button>
      
      <Button
        onClick={handleCall}
        size="icon"
        className="h-12 w-12 rounded-full shadow-warm bg-secondary hover:bg-secondary/80"
        aria-label="Call Us"
      >
        <Phone className="h-5 w-5" />
      </Button>
      
      <Button
        onClick={handleWhatsApp}
        size="icon"
        className="h-12 w-12 rounded-full shadow-warm bg-green-600 hover:bg-green-700 text-white"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    </div>
  );
}