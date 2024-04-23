export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      carts: {
        Row: {
          id: string
          product_id: string
          quantity: number
        }
        Insert: {
          id?: string
          product_id: string
          quantity: number
        }
        Update: {
          id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_carts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      items_confirmed: {
        Row: {
          approved: boolean
          created_at: string
          id: string
          order_id: string
          shop_keeper_email: string
        }
        Insert: {
          approved: boolean
          created_at?: string
          id?: string
          order_id: string
          shop_keeper_email: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          id?: string
          order_id?: string
          shop_keeper_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_item_confirmed_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_item_confirmed_shop_keeper_email_fkey"
            columns: ["shop_keeper_email"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
        ]
      }
      news_letter: {
        Row: {
          created_at: string
          email: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_news_letter_email_fkey"
            columns: ["email"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
        ]
      }
      orders: {
        Row: {
          approved: boolean
          client_email: string
          created_at: string
          id: string
          payment_id: string
          seller_email: string
        }
        Insert: {
          approved?: boolean
          client_email: string
          created_at?: string
          id?: string
          payment_id: string
          seller_email: string
        }
        Update: {
          approved?: boolean
          client_email?: string
          created_at?: string
          id?: string
          payment_id?: string
          seller_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_orders_client_email_fkey"
            columns: ["client_email"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "public_orders_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_orders_seller_email_fkey"
            columns: ["seller_email"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
        ]
      }
      orders_confirmed: {
        Row: {
          accountant_email: string
          approved: boolean
          created_at: string
          id: string
          order_id: string
        }
        Insert: {
          accountant_email: string
          approved: boolean
          created_at?: string
          id?: string
          order_id: string
        }
        Update: {
          accountant_email?: string
          approved?: boolean
          created_at?: string
          id?: string
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_orders_confirmed_accountant_email_fkey"
            columns: ["accountant_email"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "public_orders_confirmed_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_products: {
        Row: {
          order_id: string
          product_id: string
        }
        Insert: {
          order_id: string
          product_id: string
        }
        Update: {
          order_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_orders_products_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_orders_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          approved: boolean
          created_at: string
          delivery_address: string
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          value: number
        }
        Insert: {
          approved?: boolean
          created_at?: string
          delivery_address: string
          id?: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          value: number
        }
        Update: {
          approved?: boolean
          created_at?: string
          delivery_address?: string
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          value?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: string
          category: string
          code: string
          created_at: string
          description: string
          id: string
          image_url: string
          name: string
          price: number
          product_code: string
          rank: number
          stock: number
        }
        Insert: {
          brand: string
          category: string
          code: string
          created_at?: string
          description: string
          id?: string
          image_url: string
          name: string
          price: number
          product_code: string
          rank: number
          stock: number
        }
        Update: {
          brand?: string
          category?: string
          code?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          name?: string
          price?: number
          product_code?: string
          rank?: number
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_products_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["name"]
          },
        ]
      }
      promotions: {
        Row: {
          created_at: string
          end_date: string
          id: string
          name: string
          percentage: number
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          name: string
          percentage: number
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          name?: string
          percentage?: number
          start_date?: string
        }
        Relationships: []
      }
      promotions_products: {
        Row: {
          product_code: string
          product_id: string
          promotion_id: string
        }
        Insert: {
          product_code: string
          product_id: string
          promotion_id: string
        }
        Update: {
          product_code?: string
          product_id?: string
          promotion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_promotions_products_product_code_fkey"
            columns: ["product_code"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_code"]
          },
          {
            foreignKeyName: "public_promotions_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_promotions_products_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          id: string
          report_type: Database["public"]["Enums"]["report_type"]
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          report_type: Database["public"]["Enums"]["report_type"]
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          report_type?: Database["public"]["Enums"]["report_type"]
          url?: string
        }
        Relationships: []
      }
      sales: {
        Row: {
          created_at: string
          end_date: string
          id: string
          percentage: number
          product_id: string
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          percentage: number
          product_id: string
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          percentage?: number
          product_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      shops_address: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string
          id: string
          name: string | null
          password: string
          role_type: Database["public"]["Enums"]["role_type"]
          rut: string | null
        }
        Insert: {
          email: string
          id?: string
          name?: string | null
          password: string
          role_type: Database["public"]["Enums"]["role_type"]
          rut?: string | null
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          password?: string
          role_type?: Database["public"]["Enums"]["role_type"]
          rut?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_method: "TRANSFER" | "DEBT" | "CREDIT"
      report_type: "PERFORMANCE" | "SALE"
      role_type: "ADMIN" | "SHOPKEEPER" | "CLIENT" | "ACCOUNTANT" | "SELLER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
