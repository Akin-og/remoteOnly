import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  currentStatus: z.string().min(1, { message: "Please select your current status" }),
  roleInterest: z.string().min(1, { message: "Please select your role interest" }),
  visaNeed: z.string().min(1, { message: "Please select your visa needs" }),
});

type FormData = z.infer<typeof formSchema>;

export const WaitlistForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // TODO: Analytics tracking - replace with actual analytics service
    console.log("[ANALYTICS] Waitlist form submitted:", { 
      email: data.email.substring(0, 3) + "***", // Anonymized for logging
      currentStatus: data.currentStatus,
      roleInterest: data.roleInterest,
      visaNeed: data.visaNeed,
    });

    try {
      // Call the edge function to handle submission and email
      const { data: result, error } = await supabase.functions.invoke("submit-waitlist", {
        body: {
          email: data.email,
          current_status: data.currentStatus,
          role_interest: data.roleInterest,
          visa_need: data.visaNeed,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "You've been added to the waitlist. Check your email for confirmation.",
      });

      // TODO: Analytics tracking - replace with actual analytics service
      console.log("[ANALYTICS] Waitlist signup successful");
    } catch (error: any) {
      console.error("Waitlist submission error:", error);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.message?.includes("duplicate") || error.message?.includes("unique")) {
        errorMessage = "This email is already on our waitlist!";
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });

      // TODO: Analytics tracking - replace with actual analytics service
      console.log("[ANALYTICS] Waitlist signup failed:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-success" />
        </div>
        <h3 className="text-3xl font-bold mb-3 text-foreground">You're on the list!</h3>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Check your email for a confirmation. We'll notify you as soon as we launch!
        </p>
      </div>
    );
  }

  return (
    <section id="waitlist-form" className="py-20 px-4 bg-background scroll-mt-20">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Join the Waitlist
          </h2>
          <p className="text-lg text-muted-foreground">
            Be the first to know when we launch. Get early access and exclusive updates.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-8 rounded-2xl bg-card border border-border shadow-lg"
        >
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="h-12 text-base"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Current Status */}
          <div className="space-y-2">
            <Label htmlFor="currentStatus" className="text-base font-medium">
              Current Status *
            </Label>
            <Select
              onValueChange={(value) => setValue("currentStatus", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select your current status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Early-career">Early-career</SelectItem>
                <SelectItem value="Mid-senior">Mid-senior</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.currentStatus && (
              <p className="text-sm text-destructive">{errors.currentStatus.message}</p>
            )}
          </div>

          {/* Role Interest */}
          <div className="space-y-2">
            <Label htmlFor="roleInterest" className="text-base font-medium">
              Role Interest *
            </Label>
            <Select
              onValueChange={(value) => setValue("roleInterest", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select your role interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Analyst/Ops/Biz">Analyst/Operations/Business</SelectItem>
                <SelectItem value="Product/PM">Product/PM</SelectItem>
                <SelectItem value="Engineering/Dev">Engineering/Dev</SelectItem>
                <SelectItem value="Data">Data</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.roleInterest && (
              <p className="text-sm text-destructive">{errors.roleInterest.message}</p>
            )}
          </div>

          {/* Visa Need */}
          <div className="space-y-2">
            <Label htmlFor="visaNeed" className="text-base font-medium">
              Visa/Sponsorship Need *
            </Label>
            <Select
              onValueChange={(value) => setValue("visaNeed", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select your visa needs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Need sponsorship">Need sponsorship</SelectItem>
                <SelectItem value="Do not need sponsorship">Do not need sponsorship</SelectItem>
                <SelectItem value="Not sure">Not sure</SelectItem>
              </SelectContent>
            </Select>
            {errors.visaNeed && (
              <p className="text-sm text-destructive">{errors.visaNeed.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Join the Waitlist"
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
};
