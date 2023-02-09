### 1 - Criar a INTERFACE em um arquivo exclusivo para ela

### 2 

- 2.1 - Criar o ENTITYADAPTER

- 2.2 - Criar o SLICE utilizando o [adapter].getInitialState() e [adapter].addOne ou .removeOne, etc.

### 3 - Fazer os Exports:
- 3.1 - do slice
- 3.2 - das actions (reducers do slice) - ex.: `export const { addEntity, removeEntity } = slice.actions;`

### 4 - Criar a Store utilizando o configureStore do redux/toolkit

### 5 - Fazer os exports:
- 5.1 da própria store
- 5.2 do Type - ex.: `export type RootState = ReturnType<typeof store.getState>;`

### 6 - Fazer export do selector selectAll do adapter
ex.: 
```TS
export const { selectAll } = [adapter].getSelectors((state: RootState) => state.entityReducer);
```

### 7 - Criar a configuração do Redux-Persist (no arquivo da Store)

### 8 - Criar o 'persistedReducer' passando a config e o slice.Reducer (no arquivo da Store)

### 9 - Atualizar a Store utilizando o 'persistedReducer'
ex.: 
```TS
const store = configureStore({
    reducer: {
        talReducer: persistedReducer
    }
});
```

### 10 - Exportar a 'persistedStore' utilizando o persistStore do redux-persist

### 11 - Englobar toda a aplicação com um `<Provider store={store}>` e `<PersistGate persistor={persistor}>`