
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Tooth, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar,
  ArrowRight,
  Users,
  Shield,
  Smile,
  HeartPulse,
  Sparkles 
} from 'lucide-react';

const services = [
  {
    title: 'Soins Préventifs',
    description: 'Examens complets, nettoyages et conseils pour maintenir une bouche saine',
    icon: Shield
  },
  {
    title: 'Soins Esthétiques',
    description: 'Blanchiment, facettes et solutions pour un sourire éclatant',
    icon: Smile
  },
  {
    title: 'Traitements Dentaires',
    description: 'Obturations, couronnes, bridges et soins endodontiques',
    icon: Tooth
  },
  {
    title: 'Chirurgie Dentaire',
    description: 'Extractions, implants et chirurgie parodontale',
    icon: HeartPulse
  },
  {
    title: 'Orthodontie',
    description: 'Alignement des dents avec différentes options d\'appareils',
    icon: Sparkles
  },
  {
    title: 'Urgences Dentaires',
    description: 'Traitement rapide pour soulager douleur et inconfort',
    icon: Clock
  }
];

const doctorsInfo = [
  {
    name: 'Dr. Sophie Martin',
    speciality: 'Dentiste généraliste',
    description: 'Spécialisée dans les soins préventifs et restaurateurs avec 12 ans d\'expérience',
    availability: 'Lundi, Mercredi, Vendredi'
  },
  {
    name: 'Dr. Thomas Dubois',
    speciality: 'Orthodontiste',
    description: 'Expert en correction dentaire et alignement pour enfants et adultes',
    availability: 'Mardi, Jeudi, Samedi'
  },
  {
    name: 'Dr. Emma Laurent',
    speciality: 'Chirurgien-dentiste',
    description: 'Spécialisée en implantologie et chirurgie buccale complexe',
    availability: 'Lundi, Mardi, Jeudi'
  },
  {
    name: 'Dr. Antoine Moreau',
    speciality: 'Endodontiste',
    description: 'Expert en traitements de canal et soins dentaires complexes',
    availability: 'Mercredi, Vendredi, Samedi'
  }
];

const heroVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const serviceVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCA0NGMwLTMuMzE1LTIuNjg1LTYtNi02cy02IDIuNjg1LTYgNiAyLjY4NSA2IDYgNiA2LTIuNjg1IDYtNnptMjQgMGMwLTMuMzE1LTIuNjg1LTYtNi02cy02IDIuNjg1LTYgNiAyLjY4NSA2IDYgNiA2LTIuNjg1IDYtNnoiIC8+PC9nPjwvZz48L3N2Zz4=')]"></div>

        <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center space-y-6"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Bienvenue à <span className="text-dental-200">Brain Dental X</span>
              </h1>
              <p className="mt-4 text-xl text-dental-100">Votre partenaire pour un sourire éclatant de santé</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rendez-vous" className="px-6 py-3 bg-white text-dental-600 font-medium rounded-lg hover:bg-dental-50 transition-colors duration-300 flex items-center justify-center gap-2">
                Prendre rendez-vous
                <Calendar className="h-5 w-5" />
              </Link>
              <a href="#services" className="px-6 py-3 bg-dental-700 text-white font-medium rounded-lg hover:bg-dental-800 transition-colors duration-300 flex items-center justify-center gap-2">
                Nos services
                <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Nos Services</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Nous offrons une large gamme de soins dentaires utilisant les technologies les plus avancées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                custom={index}
                variants={serviceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="service-card"
              >
                <div className="service-icon">
                  <service.icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre équipe section */}
      <section id="doctors" className="py-20 bg-dental-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Notre Équipe</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Des professionnels qualifiés et passionnés pour prendre soin de votre santé bucco-dentaire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctorsInfo.map((doctor, index) => (
              <motion.div
                key={doctor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 bg-dental-200 h-40 md:h-auto flex items-center justify-center">
                  <Users className="h-20 w-20 text-dental-700" />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                  <p className="text-dental-600 font-medium">{doctor.speciality}</p>
                  <p className="mt-2 text-gray-600">{doctor.description}</p>
                  <div className="mt-4 flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emplacement et contact */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nous Contacter</h2>
              
              <div className="space-y-4">
                <div className="contact-info">
                  <MapPin className="h-5 w-5 text-dental-500" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p>123 Avenue de la Dentisterie, 75000 Paris</p>
                  </div>
                </div>
                
                <div className="contact-info">
                  <Phone className="h-5 w-5 text-dental-500" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p>+33 1 23 45 67 89</p>
                  </div>
                </div>
                
                <div className="contact-info">
                  <Mail className="h-5 w-5 text-dental-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p>contact@braindentalx.com</p>
                  </div>
                </div>
                
                <div className="contact-info">
                  <Clock className="h-5 w-5 text-dental-500" />
                  <div>
                    <p className="font-medium">Horaires d'ouverture</p>
                    <p>Lundi - Vendredi: 9h00 - 19h00</p>
                    <p>Samedi: 9h00 - 13h00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/rendez-vous" className="btn-primary inline-flex items-center gap-2">
                  Prendre rendez-vous <Calendar className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-md">
              {/* Emplacement carte Google Maps
                  À remplacer par une intégration réelle de Google Maps */}
              <div className="w-full h-full flex items-center justify-center bg-dental-100">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-dental-500 mx-auto mb-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Notre Emplacement</h3>
                  <p className="text-gray-600">Carte interactive à intégrer ici</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dental-800 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Brain Dental X</h3>
              <p className="max-w-xs text-dental-100">Votre clinique dentaire moderne proposant des soins de qualité dans un environnement confortable.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-dental-300 transition-colors">Accueil</a></li>
                  <li><a href="#services" className="hover:text-dental-300 transition-colors">Services</a></li>
                  <li><a href="#doctors" className="hover:text-dental-300 transition-colors">Notre Équipe</a></li>
                  <li><a href="#contact" className="hover:text-dental-300 transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-dental-300 transition-colors">Soins Préventifs</a></li>
                  <li><a href="#" className="hover:text-dental-300 transition-colors">Soins Esthétiques</a></li>
                  <li><a href="#" className="hover:text-dental-300 transition-colors">Chirurgie Dentaire</a></li>
                  <li><a href="#" className="hover:text-dental-300 transition-colors">Orthodontie</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Nous Suivre</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-dental-300 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-dental-300 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-dental-300 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-dental-700 text-center text-dental-300">
            <p>© 2023 Brain Dental X. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
