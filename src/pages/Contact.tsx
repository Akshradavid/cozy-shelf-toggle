import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FloatingContact } from "@/components/floating-contact";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@cozyshelf.com",
      description: "Send us a message anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "(555) 123-BOOK",
      description: "Mon-Fri, 9am-6pm EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Literary Lane, Book City, BC 12345",
      description: "Come browse in person"
    },
    {
      icon: Clock,
      title: "Store Hours",
      content: "Mon-Sat: 9am-8pm, Sun: 10am-6pm",
      description: "Always open online"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-serif text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about a book? Need a recommendation? Want to chat about 
              literature? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-warm">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us what's on your mind..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Other Ways to Reach Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Choose the method that works best for you. We're here to help 
                with book recommendations, order questions, or just to chat about 
                your latest read!
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-foreground mb-1">
                          {info.content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Link */}
            <Card className="border-0 shadow-soft bg-gradient-accent">
              <CardContent className="p-6 text-center">
                <h3 className="font-serif text-lg font-semibold mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find quick answers to common questions about orders, shipping, 
                  returns, and more.
                </p>
                <Button variant="outline" size="sm">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-warm bg-primary max-w-2xl mx-auto">
            <CardContent className="p-8 text-primary-foreground">
              <h3 className="font-serif text-2xl font-bold mb-4">
                Stay Connected
              </h3>
              <p className="mb-6 opacity-90">
                Subscribe to our newsletter for book recommendations, exclusive 
                offers, and literary news delivered to your inbox.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="rounded-full"
                onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Subscribe to Newsletter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <FloatingContact />
    </div>
  );
}