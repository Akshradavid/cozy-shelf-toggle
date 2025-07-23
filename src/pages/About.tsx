import { BookOpen, Heart, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  const values = [
    {
      icon: BookOpen,
      title: "Literary Passion",
      description: "We believe in the transformative power of books and stories that shape our world."
    },
    {
      icon: Heart,
      title: "Community Focus",
      description: "Building a warm, welcoming community of readers who share their love for literature."
    },
    {
      icon: Users,
      title: "Personal Service",
      description: "Every recommendation is carefully considered to match your unique reading preferences."
    },
    {
      icon: Award,
      title: "Quality Curation",
      description: "Our team of book lovers handpicks every title to ensure the highest quality selection."
    }
  ];

  const team = [
    {
      name: "Emma Thompson",
      role: "Founder & Head Curator",
      description: "Former librarian with 15 years of experience in literary curation."
    },
    {
      name: "Marcus Chen",
      role: "Community Manager",
      description: "Book blogger and reading group facilitator passionate about connecting readers."
    },
    {
      name: "Sarah Johnson",
      role: "Children's Book Specialist",
      description: "Elementary school teacher dedicated to fostering young readers' love for books."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl font-bold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Founded in 2018, Cozy Shelf began as a small neighborhood bookstore 
              with a simple mission: to create a warm, welcoming space where book 
              lovers could discover their next favorite read.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <BookOpen className="h-6 w-6" />
              <span className="font-serif text-lg font-semibold">
                Every book has a story. So do we.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We believe that books have the power to transport us to new worlds, 
                  introduce us to fascinating characters, and expand our understanding 
                  of the human experience. Our mission is to connect readers with the 
                  perfect books for their journey.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're looking for the latest bestseller, a hidden gem from 
                  an indie author, or a classic you've been meaning to read, we're here 
                  to help you discover your next literary adventure.
                </p>
              </div>
              <div className="bg-gradient-accent rounded-lg p-8 text-center">
                <div className="text-4xl font-bold text-primary mb-2">6 Years</div>
                <div className="text-sm text-muted-foreground mb-4">Serving book lovers</div>
                <div className="text-2xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-sm text-muted-foreground mb-4">Books delivered</div>
                <div className="text-2xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-sm text-muted-foreground">Happy customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-warm">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              What We Stand For
            </h2>
            <p className="text-muted-foreground">
              The values that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <value.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="font-serif text-lg font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground">
              The passionate people behind your reading experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto text-primary-foreground">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Join Our Reading Community
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Discover new books, connect with fellow readers, and be part of 
              our growing community of book lovers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg" className="rounded-full">
                <Link to="/categories">Start Shopping</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}