import { ArrowRight, Package, Phone, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NoOrderFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto">
          <CardContent className="py-8 text-center">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              You haven&apos;t placed any orders yet. Start shopping to see your
              orders here.
            </p>
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/products">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Start Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Browse Categories</Link>
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                Need help finding something?
              </p>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
