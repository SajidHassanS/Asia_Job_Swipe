import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react"; // Import tick and cross in circle icons from lucide-react

type Plan = {
  name: string;
  price: string;
  features: string[];
  unavailableFeatures: string[];
  buttonVariant: "default" | "outline" | "link" | "destructive" | "secondary" | "ghost" | null | undefined;
  bgColor: string;
  textColor?: string;
  buttonClass?: string;
  extraClass?: string;
};

const plans: Plan[] = [
  {
    name: "Basic",
    price: "£7",
    features: [
      "Attendance Management",
      "Leave System Management",
      "Employee Management",
      "Chat Support",
      "Expense Tracking",
    ],
    unavailableFeatures: ["Invoice Generate", "Purchase Generate", "Payroll", "App Management"],
    buttonVariant: "outline",
    bgColor: "bg-background",
    extraClass: "",
  },
  {
    name: "Premium",
    price: "£9",
    features: [
      "App Management",
      "Attendance Management",
      "Leave System Management",
      "Employee Management",
      "Expense Tracking",
      "Chat Support",
      "Invoice Generate",
    ],
    unavailableFeatures: ["Purchase Generate", "Payroll"],
    buttonVariant: "default",
    bgColor: "bg-signature",
    textColor: "text-background",
    buttonClass: "bg-background text-signature",
    extraClass: "transform translate-y-[-10px] scale-105", // Added classes for elevation and scaling
  },
  {
    name: "Enterprise",
    price: "£12",
    features: [
      "App Management",
      "Attendance Management",
      "Leave System Management",
      "Employee Management",
      "Expense Tracking",
      "Chat Support",
      "Invoice Generate",
      "Purchase Generate",
      "Payroll",
    ],
    unavailableFeatures: [],
    buttonVariant: "outline",
    bgColor: "bg-background",
    extraClass: "",
  },
];

const PaymentPlan: React.FC = () => {
  return (

    
    <div className="container mx-auto py-16">
      <h1 className="text-center md:text-3xl font-bold mb-4 text-signature">Choose Your Plan</h1>
      <p className="text-center text-lg text-muted-foreground mb-8">
        Best Plans For <span className="text-signature">Office Management</span>
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`max-w-md p-6 ${plan.bgColor} ${plan.extraClass}`}
          >
            <CardHeader>
              <CardTitle className={plan.textColor}>{plan.name}</CardTitle>
              <CardDescription className={`text-2xl ${plan.textColor}`}>
                {plan.price} <span className="text-lg">User/Month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" />
                  <p className={plan.textColor}>{feature}</p>
                </div>
              ))}
              {plan.unavailableFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center">
                  <XCircle className={`mr-2 ${plan.textColor ? "text-gray-300" : "text-gray-400"}`} />
                  <p className={plan.textColor ? "text-gray-300" : "text-muted-foreground"}>{feature}</p>
                </div>
              ))}
            </CardContent>
            <div className="pt-4">
              <Button
                className={`w-full ${plan.buttonClass} hover:bg-background hover:text-signature`}
              >
                Choose Plan
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button className="w-2/3 px-8 py-4 text-xl">Continue</Button>
      </div>
    </div>
  );
};

export default PaymentPlan;
