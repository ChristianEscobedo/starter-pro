# Tech Stack

This starter kit uses the following tech stack:

1. **Core Framework and Runtime:**
   - **Next.js 14.2.23**: The main framework used for building the application, providing server-side rendering, routing, and API capabilities
     - Core Next.js configuration in `next.config.mjs`
     - API routes in `app/api/` directory
     - Middleware configuration in `middleware.ts`
   - **React 18**: The underlying UI library for building components
     - Components directory: `components/`
     - Hooks directory: `hooks/`
   - **TypeScript**: Used for type-safe development
     - Types directory: `types/`
     - Configuration in `tsconfig.json`

2. **Authentication and User Management:**
   - **Clerk**: Implemented via `@clerk/nextjs` for handling authentication and user management
     - Middleware configuration in `middleware.ts`
     - Provider configuration in `components/providers/clerk-client-provider.tsx`. Add provider to `app/layout.tsx` to start using clerk

3. **Database and Backend:**
   - **Supabase**: Used as the main database and backend service
     - Client implementation: `utils/supabase/client.ts`
     - Server implementation: `utils/supabase/server.ts`
     - Admin utilities: `utils/supabase/admin.ts`
     - Context provider: `utils/supabase/context.tsx`
     - Database migrations: `supabase/migrations/`
     - Configuration: `supabase/config.toml`
   - Database schema includes tables for:
     - customers
     - products
     - prices
     - subscriptions
   - Row Level Security (RLS) is enabled for data protection
   - Custom types for handling pricing plans and subscription statuses

4. **Data Fetching and State Management:**
   - **TanStack React Query**: For efficient server state management and data fetching
     - Provider configuration: `components/providers/tanstack-client-provider.tsx`
     - Add provider to `app/layout.tsx` to enable React Query throughout the app
     - Example query hook structure in `hooks/`:
       ```typescript
       // hooks/use-products.ts
       import { useQuery } from '@tanstack/react-query';
       import { useSupabase } from '@/utils/supabase/context';
       
       export function useProducts() {
         return useQuery({
           queryKey: ['products'],
           queryFn: async () => {
               // Example usage with Supabase client, you can also do any async request to a server here through fetch, axios, Nextjs server actions, etc.
               const supabase = useSupabase();
               
               const {data, error} = await supabase.from('products').select('*');
               
               if (error) {
                throw error;
               }

               return data;
           },
         });
       }
       ```
     - Example mutation hook structure:
       ```typescript
       // hooks/use-create-product.ts
       import { useMutation, useQueryClient } from '@tanstack/react-query';
       
       export function useCreateProduct() {
         const queryClient = useQueryClient();
         
         return useMutation({
           mutationFn: async (productData) => {
             const response = await fetch('/api/products', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(productData),
             });
             if (!response.ok) {
               throw new Error('Failed to create product');
             }
             return response.json();
           },
           // Invalidate and refetch products after mutation
           onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ['products'] });
           },
         });
       }
       ```
     - Usage in components:
       ```typescript
       // Example component using the hooks
       function ProductsList() {
         const { data: products, isLoading } = useProducts();
         const { mutate: createProduct } = useCreateProduct();
         
         if (isLoading) return <div>Loading...</div>;
         
         return (
           <div>
             {products.map(product => (
               <div key={product.id}>{product.name}</div>
             ))}
             <button onClick={() => createProduct({ name: 'New Product' })}>
               Add Product
             </button>
           </div>
         );
       }
       ```

5. **Payment Processing:**
   - **Stripe**: Integrated for payment processing
     - Client implementation: `utils/stripe/client.ts`
     - Server implementation: `utils/stripe/server.ts`
     - Configuration: `utils/stripe/config.ts`
     - Webhook handlers: `app/api/webhooks/route.ts`
   - Both client (`@stripe/stripe-js`) and server-side (`stripe`) libraries are used
   - Complete subscription management system with pricing plans

6. **UI Components and Styling:**
   - **shadcn/ui**: Beautifully designed components made with Tailwind CSS and Radix UI
     - Configuration: `components.json`
   - **Radix UI**: Extensive use of accessible components including:
     - Dialog, Popover, Tooltip
     - Navigation menus
     - Form elements (Checkbox, Radio, Select)
     - Layout components (Accordion, Tabs)
   - **Tailwind CSS**: For styling with utility classes
     - Configuration: `tailwind.config.ts`
     - PostCSS configuration: `postcss.config.mjs`
     - Uses `tailwindcss-animate` for animations
   - **Framer Motion**: For advanced animations
   - **Lucide React**: For icons
   - **Embla Carousel**: For carousel/slider components
   - **Sonner**: For toast notifications
   - **class-variance-authority**: For managing component variants
   - **clsx** and **tailwind-merge**: For conditional class name handling

7. **Form Handling and Validation:**
   - **React Hook Form**: For form management
   - **Zod**: For schema validation
   - **@hookform/resolvers**: For integrating Zod with React Hook Form

8. **Date Handling and Charts:**
   - **date-fns**: For date manipulation
   - **React Day Picker**: For date picking components
   - **Recharts**: For data visualization and charts

9. **Development Tools:**
   - **ESLint**: For code linting
     - Configuration: `.eslintrc.json`
   - **Prettier**: For code formatting with Tailwind plugin
     - Configuration: `.prettierrc`
   - **TypeScript**: For static type checking
   - **PostCSS**: For CSS processing

10. **UI/UX Features:**
    - **next-themes**: For dark/light theme switching
    - **react-resizable-panels**: For resizable layout panels
    - **vaul**: For additional UI components
    - **cmdk**: For command palette functionality

11. **AI Integration:**
    - OpenAI implementation: `utils/ai/openai.ts`

12. **Helper Utilities:**
    - General helpers: `utils/helpers.ts`

The project is set up as a modern SaaS application with:
- Full subscription management system
- Secure authentication
- Type-safe development
- Modern UI components
- Responsive design
- Server-side rendering capabilities
- API routes for backend functionality
- Database with proper security measures
- Payment processing integration

This tech stack provides a robust foundation for building a scalable, secure, and user-friendly web application with all the modern features expected in a professional SaaS product.
