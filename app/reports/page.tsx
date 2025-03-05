"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("monthly")
  const [fileFormat, setFileFormat] = useState("csv")

  const handleExport = () => {
    // In a real application, this would generate and download the report
    console.log(`Exporting ${reportType} report in ${fileFormat} format`)
    alert(`Exporting ${reportType} report in ${fileFormat} format`)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Report Type</label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly Report</SelectItem>
              <SelectItem value="quarterly">Quarterly Report</SelectItem>
              <SelectItem value="yearly">Yearly Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">File Format</label>
          <Select value={fileFormat} onValueChange={setFileFormat}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select file format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleExport}>Export Report</Button>
      </div>
    </div>
  )
}

