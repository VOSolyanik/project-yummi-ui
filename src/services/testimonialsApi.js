import api from './api.js';

export const testimonialsAPI = {
  // Fetch testimonials list
  getTestimonials: async () => {
    try {
      const response = await api.get('/testimonials');

      // Backend returns array of objects with fields like { id, testimonial, owner: { name } }
      const rawItems = Array.isArray(response.data) ? response.data : response.data.items || [];

      const items = rawItems.map(it => ({
        id: it.id,
        text: it.testimonial || it.text || '',
        author: (it.owner && it.owner.name) || it.author || 'Anonymous'
      }));

      return { data: { items } };
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }
};
