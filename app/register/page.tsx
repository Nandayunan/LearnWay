"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, BookOpen, User, GraduationCap, Upload, X, FileText, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1) // 1: User Type, 2: Basic Info, 3: Additional Info
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    // Student specific
    interests: [] as string[],
    learningGoals: "",
    // Teacher specific
    subjects: [] as string[],
    description: "",
    education: "",
    experience: "",
    hourlyRate: "",
    teachingExperience: "",
    certifications: "",
  })

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Literature",
    "History",
    "Geography",
    "Economics",
    "Computer Science",
    "Programming",
    "Piano",
    "Guitar",
    "Violin",
    "Art",
    "Photography",
    "Languages",
    "French",
    "Spanish",
    "Mandarin",
    "Japanese",
    "Korean",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: "interests" | "subjects", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration submitted:", {
      userType,
      formData,
      uploadedFiles: uploadedFiles.map((f) => f.name),
    })
    // Here you would typically send the data to your backend
    // Redirect to dashboard or verification page
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return <ImageIcon className="w-4 h-4" />
    }
    return <FileText className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">LearnWay</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gabung Learnway</h1>
          <p className="text-gray-600">Buat akun untuk menikmati pengalaman baru</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">tahapan {currentStep} dari 3</span>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {/* Step 1: User Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih peranmu</h2>
                  <p className="text-gray-600">bagaimana Anda ingin menggunakan Learnway?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${userType === "student" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    onClick={() => setUserType("student")}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Calon Murid</h3>
                      <p className="text-gray-600 text-sm">
                        mencari tutor untuk membantu saya mempelajari keterampilan baru dan meningkatkan pengetahuan saya
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${userType === "teacher" ? "ring-2 ring-orange-500 bg-orange-50" : "hover:bg-gray-50"
                      }`}
                    onClick={() => setUserType("teacher")}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Calon Pengajar</h3>
                      <p className="text-gray-600 text-sm">
                        siap untuk berbagi keahlian saya dan membantu siswa mencapai tujuan pembelajaran mereka
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between">
                  <Link href="/login">
                    <Button variant="outline" className="bg-transparent">
                      Kembali Ke Login
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!userType}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Lanjutkan
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Basic Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Informasi Dasar</h2>
                  <p className="text-gray-600">Informasi tentang dirimu</p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        Nama Awal *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="john"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Nama Akhir *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="doe"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Alamat Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        password *
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="create a strong password"
                          className="pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        konfirmasi password *
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          placeholder="confirm your password"
                          className="pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        nomor telepon *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+62 xxx xxxx xxxx"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                        lokasi *
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="jakarta, indonesia"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </form>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="bg-transparent">
                    Kembali
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="bg-blue-600 hover:bg-blue-700">
                    Lanjut
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {userType === "student" ? "learning preferences" : "Profile Pengajar"}
                  </h2>
                  <p className="text-gray-600">
                    {userType === "student"
                      ? "help us personalize your learning experience"
                      : "Beri tahu kami lebih banyak tentang dirimu dan keahlian mengajarmu"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student-specific fields */}
                  {userType === "student" && (
                    <>
                      <div>
                        <Label className="text-base font-medium mb-3 block">
                          bidang apa yang bisa kamu ajari *
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 border rounded-lg bg-gray-50">
                          {subjects.map((subject) => (
                            <div key={subject} className="flex items-center space-x-2">
                              <Checkbox
                                id={`interest-${subject}`}
                                checked={formData.interests.includes(subject)}
                                onCheckedChange={() => handleArrayToggle("interests", subject)}
                              />
                              <Label htmlFor={`interest-${subject}`} className="text-sm">
                                {subject}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          select subjects you're interested in learning (minimum 1 required)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="learningGoals" className="text-sm font-medium text-gray-700">
                          learning goals
                        </Label>
                        <Textarea
                          id="learningGoals"
                          value={formData.learningGoals}
                          onChange={(e) => handleInputChange("learningGoals", e.target.value)}
                          placeholder="tell us about your learning goals and what you hope to achieve..."
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}

                  {/* Teacher-specific fields */}
                  {userType === "teacher" && (
                    <>
                      <div>
                        <Label className="text-base font-medium mb-3 block">kamu bisa di bidang apa? *</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 border rounded-lg bg-gray-50">
                          {subjects.map((subject) => (
                            <div key={subject} className="flex items-center space-x-2">
                              <Checkbox
                                id={`subject-${subject}`}
                                checked={formData.subjects.includes(subject)}
                                onCheckedChange={() => handleArrayToggle("subjects", subject)}
                              />
                              <Label htmlFor={`subject-${subject}`} className="text-sm">
                                {subject}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Pilih semua bidang yang kamu ahli (minimal 1 pilihan)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                          Deskripsi pengajar *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="describe your teaching style, approach, and what makes you a great tutor..."
                          rows={4}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="education" className="text-sm font-medium text-gray-700">
                          Latar belakang pendidikan *
                        </Label>
                        <Textarea
                          id="education"
                          value={formData.education}
                          onChange={(e) => handleInputChange("education", e.target.value)}
                          placeholder="list your educational qualifications, degrees, certifications..."
                          rows={3}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="teachingExperience" className="text-sm font-medium text-gray-700">
                            Pengalaman mengajar *
                          </Label>
                          <Select
                            value={formData.teachingExperience}
                            onValueChange={(value) => handleInputChange("teachingExperience", value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-1">less than 1 year</SelectItem>
                              <SelectItem value="1-2">1-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700">
                            Tarif /jam (Rp) *
                          </Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={formData.hourlyRate}
                            onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                            placeholder="25"
                            min="10"
                            max="200"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                          Pengalaman tambahan
                        </Label>
                        <Textarea
                          id="experience"
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          placeholder="any additional relevant experience, achievements, or qualifications..."
                          rows={3}
                          className="mt-1"
                        />
                      </div>

                      {/* File Upload Section */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          certifications & diplomas
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            upload your certificates, diplomas, or other credentials
                          </p>
                          <p className="text-xs text-gray-500 mb-4">supported formats: PDF, JPG, PNG (max 5MB each)</p>
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <Label htmlFor="file-upload">
                            <Button type="button" variant="outline" className="bg-transparent">
                              choose files
                            </Button>
                          </Label>
                        </div>

                        {/* Uploaded Files Display */}
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <Label className="text-sm font-medium text-gray-700">uploaded files:</Label>
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                              >
                                <div className="flex items-center space-x-2">
                                  {getFileIcon(file.name)}
                                  <span className="text-sm text-gray-700">{file.name}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </Badge>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      i agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                        privacy policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="bg-transparent">
                      back
                    </Button>
                    <Button
                      type="submit"
                      className={`text-white ${userType === "student" ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-600 hover:bg-orange-700"
                        }`}
                    >
                      create {userType} account
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Sudah punya Learnway?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Login disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
