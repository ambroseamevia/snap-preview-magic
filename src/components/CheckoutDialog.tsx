import { ExternalLink, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Product {
  id: number;
  name: string;
  price: number;
  selarLink: string;
  image: string;
}

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cart: Product[];
  cartTotal: number;
}

export const CheckoutDialog = ({ isOpen, onOpenChange, cart, cartTotal }: CheckoutDialogProps) => {
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    
    let message = "Hi! I want to order the following items from Brivon:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - GH¢${item.price}\n`;
    });
    message += `\nTotal: GH¢${cartTotal}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/233545599550?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Choose your preferred checkout method
          </DialogDescription>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <ScrollArea className="max-h-60">
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4 p-3 bg-muted/50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-accent font-bold">GH¢{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-3xl font-bold text-accent">GH¢{cartTotal}</span>
              </div>

              {/* WhatsApp Checkout */}
              <div className="space-y-4">
                <Button 
                  onClick={handleWhatsAppOrder}
                  className="w-full gap-2 h-12 text-base"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order via WhatsApp
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* Selar Checkout */}
                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">
                    Purchase items individually via Selar:
                  </p>
                  <div className="space-y-2">
                    {cart.map((item, index) => (
                      <div key={`selar-${item.id}-${index}`} className="flex items-center justify-between gap-2">
                        <span className="text-sm truncate flex-1">{item.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="shrink-0"
                        >
                          <a 
                            href={item.selarLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
