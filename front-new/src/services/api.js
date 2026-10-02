import propertiesData, { 
  getPropertiesByAction, 
  getPropertyById as getPropertyByIdStatic,
  getAllProperties
} from '../data/propertiesData';

export const API_URL = '';

// Fake API delay to simulate network
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getPublicProperties = async (params = {}) => {
  await delay();
  let properties = [];
  
  if (params.actionType) {
    properties = getPropertiesByAction(params.actionType);
  } else {
    properties = getAllProperties();
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    properties = properties.filter(p => 
      p.location.toLowerCase().includes(searchLower) ||
      p.titre.toLowerCase().includes(searchLower) ||
      p.type.toLowerCase().includes(searchLower)
    );
  }

  if (params.limit) {
    properties = properties.slice(0, parseInt(params.limit));
  }

  return { properties };
};

export const getPropertyById = async (id) => {
  await delay();
  const property = getPropertyByIdStatic(id);
  if (!property) throw new Error("Propriété non trouvée");
  return property;
};

export const getProperties = async () => {
  await delay();
  return { properties: getAllProperties() };
};

export const getAdminStats = async () => {
  await delay();
  return { views: 1250, inquiries: 45, properties: getAllProperties().length };
};

export const loginAdmin = async (email, password) => {
  await delay();
  if (email === 'admin@immotulear.com' && password === 'admin123') {
    return { token: 'fake-jwt-token-for-static-site' };
  }
  throw new Error('Identifiants incorrects');
};

export const getMe = async () => {
  await delay();
  return { user: { id: 1, email: 'admin@immotulear.com', role: 'ADMIN' } };
};

export const submitContact = async (data) => {
  await delay();
  console.log("Contact form submitted (STATIC MODE):", data);
  return { message: 'Message envoyé avec succès' };
};

// Disable mutating functions for static site
export const createProperty = async (data) => {
  throw new Error("Action désactivée : Le site est en mode statique.");
};
export const updateProperty = async (id, data) => {
  throw new Error("Action désactivée : Le site est en mode statique.");
};
export const deleteProperty = async (id) => {
  throw new Error("Action désactivée : Le site est en mode statique.");
};
export const uploadImages = async (files) => {
  throw new Error("Action désactivée : Le site est en mode statique.");
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) return imagePath;
  return `/${imagePath}`;
};


