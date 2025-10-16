"use client";

import { useState } from "react";
import { exportAllVocabs } from "@/lib/exportVocabs";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, FileText, Code } from "lucide-react";

const ExportModal = ({ isOpen, onClose, vocabCount, user_id }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("csv");

  const handleExport = async (format) => {
    if (isExporting) return;

    setIsExporting(true);
    toast.loading(`Preparing your ${format.toUpperCase()} export...`);

    try {
      const result = await exportAllVocabs(user_id, format);
      toast.dismiss();
      toast.success(`Successfully exported ${result.count} vocabulary words!`, {
        description: `Downloaded as ${result.format.toUpperCase()} file to your computer.`,
      });
      onClose(); // Close modal after successful export
    } catch (error) {
      console.error("❌ Export failed:", error);
      toast.dismiss();
      toast.error("Failed to export vocabulary", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-600" />
            Export Vocabulary
          </CardTitle>
          <CardDescription>
            Choose your preferred format to download {vocabCount} vocabulary
            words
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Format Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleExport("csv")}
              disabled={isExporting}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <FileText className="h-8 w-8 text-green-600" />
              <div className="text-center">
                <div className="font-semibold text-gray-900">CSV</div>
                <div className="text-xs text-gray-500">Spreadsheet format</div>
              </div>
            </button>

            <button
              onClick={() => handleExport("json")}
              disabled={isExporting}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Code className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <div className="font-semibold text-gray-900">JSON</div>
                <div className="text-xs text-gray-500">Developer format</div>
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          {/* Export Status */}
          {isExporting && (
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-sm">Preparing export...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportModal;
