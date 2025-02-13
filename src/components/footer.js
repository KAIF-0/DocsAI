import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const info = [
    {
      label: "Github",
      url: "https://github.com/kaif-0",
      icon: <Github />,
    },
    {
      label: "LinkedIn",
      url: "www.linkedin.com/in/kaif-khan-47bb19292",
      icon: <Linkedin />,
    },
    {
      label: "Twitter",
      url: "https://x.com/NEYO_O1",
      icon: <Twitter />,
    },
  ];

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12 mx-auto px-4 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center ">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">
              Transform Documentation Into Intelligence - AI-powered
              documentation scraping and intelligent querying system.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: docsai@gmail.com</li>
              <li>Phone: +91 8700979251</li>
              <li>Location: New Delhi, Delhi</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {info.map((data, index) => (
                <li key={index}>
                  <a
                    href={data.url}
                    target="_blank"
                    className="hover:text-primary flex justify-center items-center gap-2"
                  >
                    <span>{data.icon}</span>
                    <span>{data.label}</span>
                  </a>
                </li>
              ))}
              {/* <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  className="hover:text-primary"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="hover:text-primary"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="hover:text-primary"
                >
                  LinkedIn
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Transform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
