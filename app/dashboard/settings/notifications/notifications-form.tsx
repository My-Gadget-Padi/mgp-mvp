"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";

const notificationsFormSchema = z.object({
  method: z.enum(["whatsapp", "email", "sms"], {
    required_error: "You need to select a notification method.",
  }),
  type: z.enum(["all", "repairs only", "none"], {
    required_error: "You need to select a notification type.",
  }),
  communication_updates: z.boolean().default(false).optional(),
  social_updates: z.boolean().default(false).optional(),
  marketing_updates: z.boolean().default(false).optional(),
  security_updates: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export function NotificationsForm() {
  const { user } = useUser();
  const userId = user?.id;
  const userProfile = useQuery(api.users.getUserByClerkId, {
    clerkId: userId || "",
  });

  const profileId = userProfile?._id;

  const updateUserNotification = useMutation(api.users.updateUser);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: undefined,
  });

  useEffect(() => {
    if (userProfile) {
      const notificationMethod = userProfile.notificationMethod;
      const notificationType = userProfile.notificationType;

      form.reset({
        method:
          notificationMethod === "whatsapp" ||
          notificationMethod === "email" ||
          notificationMethod === "sms"
            ? notificationMethod
            : "email",
        type:
          notificationType === "all" ||
          notificationType === "repairs only" ||
          notificationType === "none"
            ? notificationType
            : "all",
        communication_updates: userProfile.communication_updates,
        social_updates: userProfile.social_updates,
        marketing_updates: userProfile.marketing_updates,
        security_updates: userProfile.security_updates,
      });
    }
  }, [userProfile, form]);

  const handleUpdate = async (data: NotificationsFormValues) => {
    try {
      setIsLoading(true);

      await updateUserNotification({
        userId: profileId as Id<"users">,
        notificationMethod: data.method,
        notificationType: data.type,
        communication_updates: data.communication_updates,
        marketing_updates: data.marketing_updates,
        social_updates: data.social_updates,
        security_updates: data.security_updates,
      });

      toast({
        title: "Success!",
        description: "Your notification settings have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: NotificationsFormValues) => {
    await handleUpdate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me via...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="email" />
                    </FormControl>
                    <FormLabel className="font-normal">Email</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="whatsapp" />
                    </FormControl>
                    <FormLabel className="font-normal">WhatsApp</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sms" />
                    </FormControl>
                    <FormLabel className="font-normal">SMS</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="repairs only" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct updates on my repairs
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="mb-4 text-lg font-medium">Contact Options</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="communication_updates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Communication</FormLabel>
                    <FormDescription>
                      Receive updates about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketing_updates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4" id="marketing-toggle">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Marketing</FormLabel>
                    <FormDescription>
                      Receive updates about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social_updates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Social</FormLabel>
                    <FormDescription>
                      Receive updates about MyGadgetPadi events and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="security_updates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Security</FormLabel>
                    <FormDescription>
                      Receive updates about your account activity and security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="mt-4" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader size={20} className="animate-spin ml-2" />
          ) : (
            "Update notifications"
          )}
        </Button>
      </form>
    </Form>
  );
};