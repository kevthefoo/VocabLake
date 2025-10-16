import supabase from "@/lib/supabaseClient";

/**
 * Get all vocabulary words for the current user
 * Uses RLS (Row Level Security) for user filtering
 * @returns {Array} Array of all vocabulary objects
 */
const getAllVocabs = async () => {
  try {
    const { data, error } = await supabase
      .from("vocabs")
      .select("word_id, term, descriptions, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all vocabs:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getAllVocabs:", error);
    return [];
  }
};

/**
 * Export vocabulary data as CSV format
 * @param {Array} vocabs - Array of vocabulary objects
 * @returns {string} CSV formatted string
 */
const exportToCSV = (vocabs) => {
  if (!vocabs || vocabs.length === 0) {
    return "Term,Definitions & Examples,Date Added,ID\nNo vocabulary data to export,,,";
  }

  // CSV headers
  const headers = ["Term", "Definitions & Examples", "Date Added", "ID"];

  // Convert vocabs to CSV rows
  const rows = vocabs.map((vocab) => {
    const date = new Date(vocab.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Escape quotes and wrap in quotes if contains comma or quotes
    const term = `"${vocab.term.replace(/"/g, '""')}"`;

    // Handle descriptions array - combine all meanings into one field
    let combinedMeaning = "";
    if (Array.isArray(vocab.descriptions) && vocab.descriptions.length > 0) {
      combinedMeaning = vocab.descriptions
        .map((desc, index) => {
          if (!desc.meaning) return null; // Skip empty meanings
          let text = `${index + 1}. ${desc.meaning}`;
          if (desc.example && desc.example.trim()) {
            text += ` (Example: ${desc.example})`;
          }
          return text;
        })
        .filter(Boolean) // Remove null/empty entries
        .join(" | ");
    }

    if (!combinedMeaning) {
      combinedMeaning = "No description available";
    }

    const meaning = `"${combinedMeaning.replace(/"/g, '""').replace(/\n/g, " ")}"`;
    return `${term},${meaning},${date},${vocab.word_id}`;
  });

  return [headers.join(","), ...rows].join("\n");
};

/**
 * Export vocabulary data as JSON format
 * @param {Array} vocabs - Array of vocabulary objects
 * @returns {string} JSON formatted string
 */
const exportToJSON = (vocabs) => {
  if (!vocabs || vocabs.length === 0) {
    return JSON.stringify(
      { message: "No vocabulary data to export", data: [] },
      null,
      2,
    );
  }

  const exportData = {
    exportDate: new Date().toISOString(),
    exportFormat: "VocabLake JSON Export v1.0",
    totalVocabs: vocabs.length,
    vocabs: vocabs.map((vocab) => ({
      id: vocab.word_id,
      term: vocab.term,
      descriptions: Array.isArray(vocab.descriptions) ? vocab.descriptions : [],
      dateAdded: vocab.created_at,
      formattedDate: new Date(vocab.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    })),
  };

  return JSON.stringify(exportData, null, 2);
};

/**
 * Download file to user's computer
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  URL.revokeObjectURL(url);
};

/**
 * Export all vocabs with format selection
 * @param {string} format - Export format ('csv' or 'json')
 * @returns {Promise} Export operation promise
 */
const exportAllVocabs = async (format = "csv") => {
  try {
    console.log(`🔄 Exporting all vocabs as ${format.toUpperCase()}...`);

    const vocabs = await getAllVocabs();

    if (!vocabs || vocabs.length === 0) {
      throw new Error("No vocabulary data found to export");
    }

    const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    let content, filename, mimeType;

    if (format === "json") {
      content = exportToJSON(vocabs);
      filename = `vocablake-export-${timestamp}.json`;
      mimeType = "application/json";
    } else {
      content = exportToCSV(vocabs);
      filename = `vocablake-export-${timestamp}.csv`;
      mimeType = "text/csv";
    }

    downloadFile(content, filename, mimeType);

    console.log(
      `✅ Successfully exported ${vocabs.length} vocabs as ${format.toUpperCase()}`,
    );
    return { success: true, count: vocabs.length, format };
  } catch (error) {
    console.error("❌ Export failed:", error);
    throw error;
  }
};

export { getAllVocabs, exportToCSV, exportToJSON, exportAllVocabs };
