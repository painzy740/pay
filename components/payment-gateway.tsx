"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Download, Check, QrCode, Wallet, CreditCard } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function PaymentGateway() {
  const { toast } = useToast()
  const [copyStates, setCopyStates] = useState({
    dana: false,
    gopay: false,
  })
  const [downloading, setDownloading] = useState(false)

  const handleCopy = async (text: string, type: "dana" | "gopay") => {
    await navigator.clipboard.writeText(text)
    setCopyStates({ ...copyStates, [type]: true })

    toast({
      title: "Copied to clipboard",
      description: "Payment number has been copied",
    })

    setTimeout(() => {
      setCopyStates({ ...copyStates, [type]: false })
    }, 2000)
  }

  const handleDownloadQRIS = async () => {
    setDownloading(true)

    try {
      // Fetch the image
      const response = await fetch("https://files.catbox.moe/2qeayv.jpg")
      const blob = await response.blob()

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob)

      // Create a link element
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = "qris-code.jpg" // Set the filename

      // Append to the document
      document.body.appendChild(link)

      // Trigger the download
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)

      toast({
        title: "QRIS Downloaded",
        description: "QRIS code has been downloaded successfully",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the QRIS code",
        variant: "destructive",
      })
      console.error("Download error:", error)
    } finally {
      setTimeout(() => {
        setDownloading(false)
      }, 1500)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 font-poppins">Payment Painzyy</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-12 font-poppins">Choose your payment method</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* DANA Payment Card */}
        <div className="flex flex-col">
          <PaymentCard
            title="DANA"
            accentColor="blue"
            status="ready"
            icon={
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            }
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Virtual Account Number</p>
                <p className="text-xl font-mono tracking-wider font-semibold">085817856153</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-medium">A/N: Painzy/Y*</p>
              </div>

              <Button
                onClick={() => handleCopy("085817856153", "dana")}
                className={cn(
                  "w-full relative overflow-hidden group",
                  "bg-white dark:bg-gray-800 border-0",
                  "shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#131313,-6px_-6px_12px_#272727]",
                  "hover:shadow-[inset_6px_6px_12px_#d1d1d1,inset_-6px_-6px_12px_#ffffff] dark:hover:shadow-[inset_6px_6px_12px_#131313,inset_-6px_-6px_12px_#272727]",
                  "transition-all duration-300 text-gray-800 dark:text-white",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 opacity-0",
                    "group-hover:opacity-100 transition-opacity duration-300",
                  )}
                />

                {copyStates.dana ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">Copy Number</span>
                  </>
                )}
              </Button>
            </div>
          </PaymentCard>
        </div>

        {/* GoPay Payment Card */}
        <div className="flex flex-col">
          <PaymentCard
            title="GoPay"
            accentColor="green"
            status="not-ready"
            icon={
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            }
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Virtual Account Number</p>
                <p className="text-xl font-mono tracking-wider font-semibold">085819183072</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-medium">A/N: Painzy Official</p>
              </div>

              <Button
                onClick={() => handleCopy("085819183072", "gopay")}
                className={cn(
                  "w-full relative overflow-hidden group",
                  "bg-white dark:bg-gray-800 border-0",
                  "shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#131313,-6px_-6px_12px_#272727]",
                  "hover:shadow-[inset_6px_6px_12px_#d1d1d1,inset_-6px_-6px_12px_#ffffff] dark:hover:shadow-[inset_6px_6px_12px_#131313,inset_-6px_-6px_12px_#272727]",
                  "transition-all duration-300 text-gray-800 dark:text-white",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-emerald-400/20 opacity-0",
                    "group-hover:opacity-100 transition-opacity duration-300",
                  )}
                />

                {copyStates.gopay ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium">Copy Number</span>
                  </>
                )}
              </Button>
            </div>
          </PaymentCard>
        </div>

        {/* QRIS Payment Card */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1">
          <PaymentCard
            title="QRIS"
            accentColor="purple"
            status="ready"
            isGlass={true}
            icon={
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            }
          >
            <div className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm text-gray-500 dark:text-gray-500 font-medium">A/N: TOYSHOP store</p>
              </div>
              <div className="flex justify-center py-2">
                <div className="bg-white p-4 rounded-lg w-48 h-48 flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src="https://files.catbox.moe/2qeayv.jpg"
                    alt="QRIS Code"
                    className="w-full h-full object-contain"
                    id="qris-image"
                  />
                </div>
              </div>

              <Button
                onClick={handleDownloadQRIS}
                disabled={downloading}
                className={cn(
                  "w-full relative overflow-hidden group",
                  "bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-0",
                  "shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#131313,-6px_-6px_12px_#272727]",
                  "hover:shadow-[inset_6px_6px_12px_#d1d1d1,inset_-6px_-6px_12px_#ffffff] dark:hover:shadow-[inset_6px_6px_12px_#131313,inset_-6px_-6px_12px_#272727]",
                  "transition-all duration-300 text-gray-800 dark:text-white",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 opacity-0",
                    "group-hover:opacity-100 transition-opacity duration-300",
                  )}
                />

                {downloading ? (
                  <div className="w-full flex items-center justify-center">
                    <div className="h-1 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 dark:bg-purple-500 animate-progress-bar"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium">Download QRIS</span>
                  </>
                )}
              </Button>
            </div>
          </PaymentCard>
        </div>
      </div>
    </div>
  )
}

interface PaymentCardProps {
  title: string
  icon: React.ReactNode
  accentColor: "blue" | "green" | "purple"
  status: "ready" | "not-ready"
  isGlass?: boolean
  children: React.ReactNode
}

function PaymentCard({ title, icon, accentColor, status, isGlass = false, children }: PaymentCardProps) {
  const accentMapDark = {
    blue: "from-blue-600 to-blue-400",
    green: "from-emerald-600 to-emerald-400",
    purple: "from-purple-600 to-purple-400",
  }

  const accentMapLight = {
    blue: "from-blue-500 to-blue-300",
    green: "from-emerald-500 to-emerald-300",
    purple: "from-purple-500 to-purple-300",
  }

  return (
    <Card
      className={cn(
        "h-full p-6 relative overflow-hidden transition-all duration-300",
        "bg-white dark:bg-gray-800 border-0 hover:translate-y-[-5px]",
        "shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#131313,-6px_-6px_12px_#272727]",
        isGlass && "bg-white/80 dark:bg-gray-800/30 backdrop-blur-lg",
      )}
    >
      <div
        className={cn(
          "absolute top-0 left-0 h-1 w-full bg-gradient-to-r",
          "dark:" + accentMapDark[accentColor],
          accentMapLight[accentColor],
        )}
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {icon}
          <h2 className="text-xl font-semibold font-poppins ml-3">{title}</h2>
        </div>

        {status === "ready" ? (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">Ready</Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
          >
            Not Ready
          </Badge>
        )}
      </div>

      {children}
    </Card>
  )
}

