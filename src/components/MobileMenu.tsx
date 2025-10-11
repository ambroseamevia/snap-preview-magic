import { Menu, X, Facebook, Instagram, Twitter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onNavigate: (section: string) => void;
}

export const MobileMenu = ({ 
  isOpen, 
  onOpenChange, 
  categories, 
  selectedCategory, 
  onCategorySelect,
  onNavigate 
}: MobileMenuProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 hover:bg-muted rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">Navigation</h3>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  onNavigate('home');
                  onOpenChange(false);
                }}
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  onNavigate('products');
                  onOpenChange(false);
                }}
              >
                Products
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  onNavigate('features');
                  onOpenChange(false);
                }}
              >
                Features
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  onNavigate('about');
                  onOpenChange(false);
                }}
              >
                About Us
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  onNavigate('contact');
                  onOpenChange(false);
                }}
              >
                Contact
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    onCategorySelect(category);
                    onNavigate('products');
                    onOpenChange(false);
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">Follow Us</h3>
            <div className="flex gap-4 justify-center">
              <a 
                href="https://www.facebook.com/share/173VYCkaAq/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 hover:bg-accent/10 rounded-lg transition"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/brivonecommerce/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 hover:bg-accent/10 rounded-lg transition"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.tiktok.com/@brivonecommerce" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 hover:bg-accent/10 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/brivonecommerce" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 hover:bg-accent/10 rounded-lg transition"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
