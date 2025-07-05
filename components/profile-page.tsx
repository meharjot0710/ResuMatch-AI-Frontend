"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { User, Lock, Bell, Shield, Trash2, Save, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateName } from "@/api/auth/updateName"
import { updatePassword } from "@/api/auth/updatePassword"
import { deleteAccount } from "@/api/auth/deleteAccount"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const { toast } = useToast()

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Delete account form state
  const [deleteForm, setDeleteForm] = useState({
    password: "",
    confirmText: ""
  })

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    notifications: {
      email: true,
      analysis: true,
      marketing: false,
    },
  });

useEffect(() => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setProfile((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  } catch (err) {
    console.error("Error reading from localStorage:", err);
  }
}, []);
  const handleSaveProfile = async () => {
    if (!profile.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name cannot be empty",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const result = await updateName(profile.name, token)
      
      // Update local storage with new user data
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const updatedUser = { ...currentUser, name: result.user.name }
      localStorage.setItem('user', JSON.stringify(updatedUser))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    // Validate password form
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "All password fields are required",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New password and confirm password do not match",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Validation Error",
        description: "New password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    setIsPasswordLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword, token)
      
      // Clear password form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Password Update Failed",
        description: error.message || "Failed to update password",
        variant: "destructive",
      })
    } finally {
      setIsPasswordLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!deleteForm.password) {
      toast({
        title: "Validation Error",
        description: "Password is required to delete account",
        variant: "destructive",
      })
      return
    }

    if (deleteForm.confirmText !== "DELETE") {
      toast({
        title: "Validation Error",
        description: "Please type 'DELETE' to confirm account deletion",
        variant: "destructive",
      })
      return
    }

    setIsDeleteLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      await deleteAccount(deleteForm.password, token)
      
      // Clear local storage and redirect to login
      localStorage.clear()
      window.location.href = '/auth'
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Account Deletion Failed",
        description: error.message || "Failed to delete account",
        variant: "destructive",
      })
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Information</span>
          </CardTitle>
          <CardDescription>Update your personal information and contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <>
                  <Save className="mr-2 w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Change Password</span>
          </CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleChangePassword} disabled={isPasswordLoading}>
              {isPasswordLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                <>
                  <Lock className="mr-2 w-4 h-4" />
                  Update Password
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notification Preferences</span>
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
              </div>
              <Switch
                checked={profile.notifications.email}
                onCheckedChange={(checked) =>
                  setProfile((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: checked },
                  }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analysis Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when your resume analysis is complete</p>
              </div>
              <Switch
                checked={profile.notifications.analysis}
                onCheckedChange={(checked) =>
                  setProfile((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, analysis: checked },
                  }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">Receive updates about new features and tips</p>
              </div>
              <Switch
                checked={profile.notifications.marketing}
                onCheckedChange={(checked) =>
                  setProfile((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, marketing: checked },
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Account Security</span>
          </CardTitle>
          <CardDescription>Manage your account security and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Download Your Data</h4>
                <p className="text-sm text-muted-foreground">Export all your data including analyses and history</p>
              </div>
              <Button variant="outline">Download Data</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Delete Account</h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                Permanently delete your account and all associated data
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers including:
                    <br />
                    <br />• All resume analyses and history
                    <br />• Your profile information
                    <br />• Any saved preferences
                    <br />
                    <br />
                    Please enter your password and type "DELETE" to confirm.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="deletePassword">Password</Label>
                    <Input
                      id="deletePassword"
                      type="password"
                      placeholder="Enter your password"
                      value={deleteForm.password}
                      onChange={(e) => setDeleteForm(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmDelete">Type "DELETE" to confirm</Label>
                    <Input
                      id="confirmDelete"
                      placeholder="Type DELETE"
                      value={deleteForm.confirmText}
                      onChange={(e) => setDeleteForm(prev => ({ ...prev, confirmText: e.target.value }))}
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount} 
                    className="bg-red-600 hover:bg-red-700"
                    disabled={isDeleteLoading}
                  >
                    {isDeleteLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      "Delete Account"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
