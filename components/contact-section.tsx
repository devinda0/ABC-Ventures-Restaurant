import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";


export default function ContactSection() {
  return (
    <main className="p-8 pb-20 sm:p-20">
      {/* Header Section */}
      <div className="text-left mb-16">
        <h1 className="text-5xl md:text-5xl font-heading mb-4">
          <span className="text-primary font-bold font-heading">Get </span>
          <span className="text-[#D4AF37] font-bold font-heading">in Touch</span>
        </h1>
        <p className="text-[#D4AF37] font-secondary-heading font-semibold tracking-wider text-sm uppercase">
          CONNECT WITH US
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side - Contact Information */}
        <div className="space-y-12 pr-10">
          <div className="space-y-6">
            <p className="text-lg text-foreground leading-relaxed">
              Ready To Experience The Finest In Hospitality?
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Contact Us To Learn More About Our Restaurants, Services, Or Partnership Opportunities.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            {/* Visit Us */}
            <div className="flex items-start gap-4">
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8.83333C13.2426 8.83333 11 11.076 11 13.8333C11 16.5907 13.2426 18.8333 16 18.8333C18.7573 18.8333 21 16.5907 21 13.8333C21 11.076 18.7573 8.83333 16 8.83333ZM16 16.8333C14.3453 16.8333 13 15.488 13 13.8333C13 12.1787 14.3453 10.8333 16 10.8333C17.6546 10.8333 19 12.1787 19 13.8333C19 15.488 17.6546 16.8333 16 16.8333ZM15.9946 3.5C10.1066 3.5 5.66663 7.94267 5.66663 13.8333C5.66663 22.1107 11.9813 27.2679 14.6946 29.0999C15.0893 29.3666 15.5413 29.5 15.9946 29.5C16.4453 29.5 16.8973 29.3667 17.292 29.1014C20.0106 27.2654 26.3333 22.1014 26.3333 13.832C26.3333 7.94136 21.8893 3.5 15.9946 3.5ZM16.1733 27.444C16.0626 27.5187 15.9253 27.5187 15.8146 27.444C13.9026 26.1533 7.66663 21.3573 7.66663 13.8333C7.66663 9.08267 11.2466 5.5 15.9946 5.5C20.748 5.5 24.3333 9.08267 24.3333 13.8333C24.3333 21.144 18.6266 25.788 16.1733 27.444Z" fill="#8A1739"/>
                </svg>
              <div>
                <h3 className="text-xl font-heading text-[#D4AF37] mb-2">Visit Us</h3>
                <p className="text-muted-foreground">City, Country</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex items-start gap-4">
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.6667 6.16667H9.33333C5.84133 6.16667 3 9.00801 3 12.5V20.5C3 23.992 5.84133 26.8333 9.33333 26.8333H22.6667C26.1587 26.8333 29 23.992 29 20.5V12.5C29 9.00801 26.1587 6.16667 22.6667 6.16667ZM9.33333 8.16667H22.6667C24.472 8.16667 26.02 9.27859 26.6707 10.8506L18.404 16.3626C16.944 17.3346 15.056 17.3346 13.5973 16.3626L5.33065 10.8506C5.97998 9.27726 7.528 8.16667 9.33333 8.16667ZM22.6667 24.8333H9.33333C6.944 24.8333 5 22.8893 5 20.5V13.0347L12.4867 18.0267C13.5533 18.7374 14.776 19.0933 16 19.0933C17.2227 19.0933 18.4453 18.7374 19.5133 18.0267L27 13.0347V20.5C27 22.8893 25.056 24.8333 22.6667 24.8333Z" fill="#8A1739"/>
                </svg>
              <div>
                <h3 className="text-xl font-heading text-[#D4AF37] mb-2">Email Us</h3>
                <p className="text-muted-foreground">info@abcventures.com</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex items-start gap-4">
                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.9142 22.6334C28.8835 22.4534 28.8463 22.2962 28.8076 22.1562C28.5743 21.3229 27.8489 20.6881 26.9595 20.5415L21.1836 19.5802C20.3329 19.4375 19.4809 19.7668 18.9582 20.4362C18.8862 20.5282 18.8169 20.6215 18.7529 20.7161C18.6583 20.8548 18.4703 20.9842 18.2663 20.8948C15.2703 19.5922 12.9049 17.2268 11.6036 14.2308C11.5129 14.0241 11.6395 13.8428 11.7755 13.7508C11.9022 13.6655 12.0249 13.5735 12.1435 13.4775C12.7929 12.9522 13.1156 12.1122 12.9849 11.2842L12.0902 5.61081C11.9529 4.74148 11.3569 4.03076 10.5329 3.75876C10.3396 3.69476 10.1156 3.63616 9.85562 3.58949C8.16762 3.28816 6.44091 3.76544 5.11425 4.90411C3.72358 6.09878 2.9529 7.83487 3.00357 9.6642C3.29557 20.4935 12.0049 29.2042 22.8342 29.4962C22.8889 29.4976 22.9436 29.4988 22.9983 29.4988C24.7543 29.4988 26.4142 28.7388 27.5729 27.3974C28.7209 26.0681 29.2102 24.3308 28.9142 22.6334ZM26.057 26.0908C25.2556 27.0175 24.0902 27.5122 22.8862 27.4988C13.1209 27.2348 5.26489 19.3775 5.00089 9.61081C4.96889 8.38548 5.48357 7.22286 6.4169 6.42152C7.12223 5.81619 7.96356 5.49884 8.84089 5.49884C9.05956 5.49884 9.28094 5.51876 9.50227 5.55743C9.65694 5.58543 9.78889 5.61886 9.90355 5.65753C10.0142 5.69353 10.0956 5.79616 10.1156 5.92283L11.0102 11.5962C11.0302 11.7202 10.9823 11.8455 10.8876 11.9215C10.8103 11.9842 10.7316 12.0428 10.6502 12.0975C9.67155 12.7628 9.30895 13.9681 9.76895 15.0281C11.273 18.4895 14.0076 21.2242 17.4676 22.7282C18.5236 23.1868 19.7316 22.8256 20.4049 21.8429C20.4449 21.7856 20.4862 21.7282 20.5316 21.6696C20.6036 21.5776 20.729 21.5336 20.8556 21.5522L26.6316 22.5135C26.7542 22.5348 26.8569 22.6094 26.8822 22.6961C26.9062 22.7788 26.9262 22.8709 26.9449 22.9762C27.1369 24.0802 26.813 25.2148 26.057 26.0908Z" fill="#8A1739"/>
                </svg>
              <div>
                <h3 className="text-xl font-heading text-[#D4AF37] mb-2">Call Us</h3>
                <p className="text-muted-foreground">+XXX XXXX XXXX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-card px-8 rounded-lg">
          <h2 className="text-lg font-semibold font-heading mb-6 text-left">SEND YOUR MESSAGE</h2>
          
          <form className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Tyler"
                  className="bg-muted rounded-tl-2xl rounded-tr-none rounded-br-2xl rounded-bl-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@gmail.com"
                  className="bg-muted rounded-tl-2xl rounded-tr-none rounded-br-2xl rounded-bl-none"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <Select
                id="subject"
                name="subject"
                placeholder="Select a subject"
                className="bg-muted rounded-tl-2xl rounded-tr-none rounded-br-2xl rounded-bl-none"
              >
                <option value="restaurant-inquiry">Restaurant Inquiry</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="services">Services</option>
                <option value="general">General Inquiry</option>
              </Select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Type your message here..."
                className="w-full px-3 py-2 text-base md:text-sm rounded-tl-2xl rounded-tr-none rounded-br-2xl rounded-bl-none border border-input bg-muted shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-tl-2xl rounded-tr-none rounded-br-2xl rounded-bl-none font-medium"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}