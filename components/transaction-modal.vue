<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex justify-between">
          {{ isEditing ? 'Edit' : 'Add' }} Transaction
          <UButton
            type="button"
            color="white"
            class="bg-black"
            icon="i-heroicons-x-mark-20-solid"
            variant="solid"
            :loading="isLoading"
            @click="closeModal"
          />
        </div>
      </template>
      <UForm :state="state" :schema="schema" @submit="onSubmit" ref="form" @error="onError">
        <UFormGroup :required="true" label="Transaction Type" class="mb-4">
          <USelect :disabled="isEditing" placeholder="Select the transaction type" :options="types" v-model="state.type" />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" class="mb-4">
          <UInput type="number" placeholder="Amount" v-model="state.amount" />
        </UFormGroup>

        <UFormGroup label="Transaction date" :required="true" class="mb-4">
          <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at" />
        </UFormGroup>

        <UFormGroup label="Description" hint="Optional" class="mb-4">
          <UInput placeholder="Description" v-model="state.description" />
        </UFormGroup>

        <UFormGroup :required="true" label="Category" class="mb-4">
          <USelect placeholder="Category" :options="categories" v-model="state.category" />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" :loading="isLoading" />
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
import { z } from "zod";
import { categories, types } from "@/constants";

const props = defineProps({
  modalValue: {
    type: Boolean,
    default: false,
  },

  transaction: {
    type: Object,
    required: false
  }
});

const isEditing = computed(() => !!props.transaction)

const schema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive("Amount needs to be more than 0"),
});

const emit = defineEmits(["update:modalValue", "saved"]);
const { toastError, toastSuccess } = useAppToast();

const supabase = useSupabaseClient();

const isOpen = computed({
  get: () => props.modalValue,
  set: (value) => {
    if (!value) resetForm();
    emit("update:modalValue", value);
  },
});

const closeModal = () => emit("update:modalValue", false);

const initialState = isEditing.value ? {
  type: props.transaction.type,
  amount: props.transaction.amount,
  created_at: props.transaction.created_at.split('T')[0],
  description: props.transaction.description,
  category: props.transaction.category
} : {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined
}

const state = ref(isEditing.value ? {
  type: props.transaction.type,
  amount: props.transaction.amount,
  created_at: props.transaction.created_at.split('T')[0],
  description: props.transaction.description,
  category: props.transaction.category
} : { ...initialState });

const form = ref();
const isLoading = ref();

function onError() {
  console.log("error");
}

function resetForm() {
  Object.assign(state.value, initialState);
  form.value.clear();
}

const onSubmit = async () => {
  isLoading.value = true;
  try {
    const { error } = await supabase.from("transactions").upsert({
      ...state.value,
      id: props.transaction?.id
    });

    if (!error) {
      toastSuccess({
        title: "Transaction saved",
      });
      isOpen.value = false;
      emit("saved");
      return;
    }

    throw error;
  } catch (e) {
    toastError({
      title: "Transaction not saved",
      description: e.message,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
