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
          product_id: string
          quantity: number
          user_email: string
        }
        Insert: {
          product_id: string
          quantity: number
          user_email: string
        }
        Update: {
          product_id?: string
          quantity?: number
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_user_email_fkey"
            columns: ["user_email"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
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
      discounts: {
        Row: {
          created_at: string
          end_date: string
          id: string
          percentage: number
          start_date: string
          type: Database["public"]["Enums"]["discount_type"]
        }
        Insert: {
          created_at: string
          end_date: string
          id?: string
          percentage: number
          start_date: string
          type: Database["public"]["Enums"]["discount_type"]
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          percentage?: number
          start_date?: string
          type?: Database["public"]["Enums"]["discount_type"]
        }
        Relationships: []
      }
      items_confirmed: {
        Row: {
          created_at: string
          id: string
          shop_keeper_email: string | null
        }
        Insert: {
          created_at?: string
          id: string
          shop_keeper_email?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          shop_keeper_email?: string | null
        }
        Relationships: [
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
          client_email: string
          created_at: string
          id: string
          item_confirmed: string | null
          order_confirmed: string | null
          payment_id: string
          seller_email: string | null
        }
        Insert: {
          client_email: string
          created_at?: string
          id?: string
          item_confirmed?: string | null
          order_confirmed?: string | null
          payment_id: string
          seller_email?: string | null
        }
        Update: {
          client_email?: string
          created_at?: string
          id?: string
          item_confirmed?: string | null
          order_confirmed?: string | null
          payment_id?: string
          seller_email?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_item_confirmed_fkey"
            columns: ["item_confirmed"]
            isOneToOne: false
            referencedRelation: "items_confirmed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_order_confirmed_fkey"
            columns: ["order_confirmed"]
            isOneToOne: false
            referencedRelation: "orders_confirmed"
            referencedColumns: ["id"]
          },
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
            isOneToOne: true
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
          accountant_email: string | null
          created_at: string
          id: string
        }
        Insert: {
          accountant_email?: string | null
          created_at?: string
          id: string
        }
        Update: {
          accountant_email?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_orders_confirmed_accountant_email_fkey"
            columns: ["accountant_email"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
        ]
      }
      orders_products: {
        Row: {
          order_id: string
          product_id: string
          quantity: number
        }
        Insert: {
          order_id: string
          product_id: string
          quantity: number
        }
        Update: {
          order_id?: string
          product_id?: string
          quantity?: number
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
          average_rank: number
          brand: string
          category: string
          code: string
          created_at: string
          description: string
          discount: string | null
          id: string
          image_url: string
          name: string
          price: number
          product_code: string
          stock: number
        }
        Insert: {
          average_rank: number
          brand: string
          category: string
          code: string
          created_at?: string
          description: string
          discount?: string | null
          id?: string
          image_url: string
          name: string
          price: number
          product_code: string
          stock: number
        }
        Update: {
          average_rank?: number
          brand?: string
          category?: string
          code?: string
          created_at?: string
          description?: string
          discount?: string | null
          id?: string
          image_url?: string
          name?: string
          price?: number
          product_code?: string
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_discount_fkey"
            columns: ["discount"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
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
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotions_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
        ]
      }
      promotions_products: {
        Row: {
          product_id: string
          promotion_id: string
          quantity: number
        }
        Insert: {
          product_id: string
          promotion_id: string
          quantity: number
        }
        Update: {
          product_id?: string
          promotion_id?: string
          quantity?: number
        }
        Relationships: [
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
      rank: {
        Row: {
          created_at: string
          product_code: string
          user_email: string
          value: number
        }
        Insert: {
          created_at?: string
          product_code: string
          user_email: string
          value: number
        }
        Update: {
          created_at?: string
          product_code?: string
          user_email?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "rank_product_code_fkey"
            columns: ["product_code"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_code"]
          },
          {
            foreignKeyName: "rank_user_email_fkey"
            columns: ["user_email"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
        ]
      }
      report_payments: {
        Row: {
          date: string
          id: string
          value: number
        }
        Insert: {
          date?: string
          id?: string
          value: number
        }
        Update: {
          date?: string
          id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "report_payments_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          id: string
          name: string
          report_type: Database["public"]["Enums"]["report_type"]
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          report_type: Database["public"]["Enums"]["report_type"]
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          report_type?: Database["public"]["Enums"]["report_type"]
          url?: string
        }
        Relationships: []
      }
      sales: {
        Row: {
          id: string
          product_id: string
        }
        Insert: {
          id?: string
          product_id: string
        }
        Update: {
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "discounts"
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
          auth_id: string
          email: string
          name: string | null
          role_type: Database["public"]["Enums"]["role_type"]
          rut: string | null
        }
        Insert: {
          auth_id?: string
          email: string
          name?: string | null
          role_type: Database["public"]["Enums"]["role_type"]
          rut?: string | null
        }
        Update: {
          auth_id?: string
          email?: string
          name?: string | null
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
      discount_type: "SALE" | "PROMOTION"
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
