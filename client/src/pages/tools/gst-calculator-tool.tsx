import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calculator, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GSTResult {
  amount: number;
  gst_rate: number;
  gst_amount: number;
  total_amount: number;
  cgst: number;
  sgst: number;
  igst: number;
}

export default function GSTCalculatorTool() {
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [includeGst, setIncludeGst] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<GSTResult | null>(null);
  const { toast } = useToast();

  const calculateGST = async () => {
    if (amount <= 0 || gstRate < 0) {
      toast({
        title: "Error",
        description: "Please enter valid amount and GST rate",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);

    try {
      const formData = new FormData();
      formData.append('amount', amount.toString());
      formData.append('gst_rate', gstRate.toString());
      formData.append('include_gst', includeGst.toString());

      const response = await fetch('/api/government/gst-calculate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to calculate GST');
      }

      const result = await response.json();
      setResult(result);
      
      toast({
        title: "Success!",
        description: "GST calculated successfully",
      });

    } catch (error) {
      console.error('Calculation error:', error);
      toast({
        title: "Error",
        description: "Failed to calculate GST. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-xl mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GST Calculator</h1>
          <p className="text-gray-600">Calculate GST amounts for your business transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-white border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Receipt className="w-5 h-5 mr-2 text-gray-700" />
              GST Calculation
            </h2>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <Label htmlFor="amount" className="text-gray-700">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min="0"
                  step="0.01"
                  className="bg-white border-gray-300 text-lg"
                  placeholder="Enter amount"
                />
              </div>

              {/* GST Rate Input */}
              <div>
                <Label htmlFor="gstRate" className="text-gray-700">GST Rate (%)</Label>
                <Input
                  id="gstRate"
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.01"
                  className="bg-white border-gray-300 text-lg"
                />
                
                {/* Common GST Rates */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[0, 5, 12, 18, 28].map((rate) => (
                    <Button
                      key={rate}
                      size="sm"
                      variant="outline"
                      onClick={() => setGstRate(rate)}
                      className="text-xs"
                    >
                      {rate}%
                    </Button>
                  ))}
                </div>
              </div>

              {/* Include GST Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="includeGst" className="font-medium text-gray-900">
                    Amount includes GST
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    {includeGst 
                      ? "Amount includes GST (calculate base amount)" 
                      : "Amount is base (add GST on top)"
                    }
                  </p>
                </div>
                <Switch
                  id="includeGst"
                  checked={includeGst}
                  onCheckedChange={setIncludeGst}
                />
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateGST}
                disabled={isCalculating || amount <= 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
              >
                {isCalculating ? 'Calculating...' : 'Calculate GST'}
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="bg-white border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-gray-700" />
              Calculation Results
            </h2>

            {result ? (
              <div className="space-y-4">
                {/* Summary Card */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-green-800 font-semibold mb-3">GST Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Base Amount:</span>
                      <span className="font-mono text-gray-900">{formatCurrency(result.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">GST Rate:</span>
                      <span className="font-mono text-gray-900">{result.gst_rate}%</span>
                    </div>
                    <div className="flex justify-between border-t border-green-200 pt-2">
                      <span className="text-gray-700">GST Amount:</span>
                      <span className="font-mono text-green-700">{formatCurrency(result.gst_amount)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-green-200 pt-2">
                      <span className="text-gray-900">Total Amount:</span>
                      <span className="font-mono text-green-700">{formatCurrency(result.total_amount)}</span>
                    </div>
                  </div>
                </div>

                {/* Tax Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Tax Breakdown (Intrastate)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CGST (Central GST):</span>
                      <span className="font-mono text-gray-900">{formatCurrency(result.cgst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SGST (State GST):</span>
                      <span className="font-mono text-gray-900">{formatCurrency(result.sgst)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IGST (Integrated GST):</span>
                      <span className="font-mono text-gray-900">{formatCurrency(result.igst)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                    <p><strong>Note:</strong> For intrastate transactions, GST is split equally between CGST and SGST. For interstate transactions, only IGST applies.</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setAmount(result.amount);
                      setIncludeGst(false);
                    }}
                  >
                    Use Base Amount
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Base: ${formatCurrency(result.amount)} | GST: ${formatCurrency(result.gst_amount)} | Total: ${formatCurrency(result.total_amount)}`
                      );
                      toast({
                        title: "Copied!",
                        description: "GST calculation copied to clipboard"
                      });
                    }}
                  >
                    Copy Result
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter amount and GST rate to calculate</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}