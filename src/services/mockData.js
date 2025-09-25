// Категорії, які мають бути на макеті (в правильному порядку)
// Використовуємо назви для відображення на фронтенді
export const requiredCategories = [
  'Beef',
  'Breakfast', 
  'Desserts',  // Назва для відображення (з "s")
  'Lamb',
  'Goat',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter'
];

// Mock дані для категорій (використовуємо реальні GUID з бекенду)
export const mockCategories = [
  { _id: '30ea991a-2001-4b75-b9a3-37a3b8179581', name: 'Beef' },           // Ряд 1, позиція 1
  { _id: '770fe6f9-cd92-428a-96b4-b2496714a868', name: 'Breakfast' },      // Ряд 1, позиція 2 (використовуємо Dessert GUID)
  { _id: '770fe6f9-cd92-428a-96b4-b2496714a868', name: 'Desserts' },       // Ряд 1, позиція 3 (wide)
  { _id: 'fb455f8d-43a1-4baf-be61-95d24f731dbe', name: 'Lamb' },           // Ряд 2, позиція 1 (wide) (використовуємо Soup GUID)
  { _id: '17dbde83-fda7-42f8-9faa-6438f880fe23', name: 'Goat' },           // Ряд 2, позиція 2 (використовуємо Vegetarian GUID)
  { _id: 'aaf1f025-50b1-4cdd-b26d-ca551ff2fe27', name: 'Miscellaneous' },  // Ряд 2, позиція 3 (normal) (використовуємо Side GUID)
  { _id: '64bf3546-0848-4722-afd9-894ea7dfd143', name: 'Pasta' },          // Ряд 3, позиція 1 (використовуємо Seafood GUID)
  { _id: '44522616-fdf1-4f27-816c-fe6305f1544c', name: 'Pork' },           // Ряд 3, позиція 2 (wide)
  { _id: '64bf3546-0848-4722-afd9-894ea7dfd143', name: 'Seafood' },        // Ряд 3, позиція 3
  { _id: 'aaf1f025-50b1-4cdd-b26d-ca551ff2fe27', name: 'Side' },          // Ряд 4, позиція 1 (wide)
  { _id: '770fe6f9-cd92-428a-96b4-b2496714a868', name: 'Starter' },       // Ряд 4, позиція 2 (використовуємо Dessert GUID)
];
