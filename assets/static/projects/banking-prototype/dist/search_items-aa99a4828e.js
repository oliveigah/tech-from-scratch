searchNodes=[{"doc":"Pure functional module that manages Account data structuresOperations are always registered on account's operations either if it is :denied or :ok","ref":"Account.html","title":"Account","type":"module"},{"doc":"Get the current balance of the account for the given currencyExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000}}) iex&gt; Account.balance(init_account, :BRL) 1000","ref":"Account.html#balance/2","title":"Account.balance/2","type":"function"},{"doc":"Get all the current balances of the accountExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000, USD: 700, EUR: 300}}) iex&gt; Account.balances(init_account) %{BRL: 1000, USD: 700, EUR: 300}","ref":"Account.html#balances/1","title":"Account.balances/1","type":"function"},{"doc":"Register an event of card transaction and update the balanceExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000}}) iex&gt; { ...&gt; :ok, ...&gt; %Account{balances: %{BRL: 300}}, ...&gt; %Account.Operation{type: :card_transaction, data: %{amount: 700, currency: :BRL}} ...&gt; } = Account.card_transaction(init_account, %{amount: 700, currency: :BRL, card_id: 1}) iex&gt; init_account = Account.new(%{balances: %{BRL: -500}}) iex&gt; { ...&gt; :denied, ...&gt; reason, ...&gt; %Account{balances: %{BRL: -500}}, ...&gt; %Account.Operation{type: :card_transaction, data: %{amount: 700, currency: :BRL}} ...&gt; } = Account.card_transaction(init_account, %{amount: 700, currency: :BRL, card_id: 1})","ref":"Account.html#card_transaction/2","title":"Account.card_transaction/2","type":"function"},{"doc":"Register an event of deposit and update the balanceExamplesiex&gt; init_account = Account.new() iex&gt; { ...&gt; :ok, ...&gt; %Account{balances: %{BRL: 700}}, ...&gt; %Account.Operation{type: :deposit, data: %{amount: 700, currency: :BRL}} ...&gt; } = Account.deposit(init_account, %{amount: 700, currency: :BRL})","ref":"Account.html#deposit/2","title":"Account.deposit/2","type":"function"},{"doc":"Register an event of exchange, update the balances based on exchange ratesExamplesiex&gt; init_account = Account.new(%{balances: %{USD: 1000}}) iex&gt; { ...&gt; :ok, ...&gt; %Account{balances: %{BRL: 545, USD: 900}}, ...&gt; %Account.Operation{type: :exchange, status: :done} ...&gt; } = Account.exchange_balances(init_account, %{current_amount: 100, current_currency: :USD, new_currency: :BRL})","ref":"Account.html#exchange_balances/2","title":"Account.exchange_balances/2","type":"function"},{"doc":"Create a new Account data structureExamplesiex&gt; Account.new() %Account{balances: %{BRL: 0}, limit: -500, operations: %{}, operations_auto_id: 1}","ref":"Account.html#new/0","title":"Account.new/0","type":"function"},{"doc":"Create a new Account data strucure with modified dataExamplesiex&gt; entry_map = %{balances: %{BRL: 1000}, limit: -999} iex&gt; Account.new(entry_map) %Account{balances: %{BRL: 1000}, limit: -999, operations: %{}, operations_auto_id: 1}","ref":"Account.html#new/1","title":"Account.new/1","type":"function"},{"doc":"Get the account's operation under the given idExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000}}) iex&gt; {:ok, new_account, _} = Account.withdraw(init_account, %{amount: 700, currency: :BRL}) iex&gt; %Account.Operation{} = Account.operation(new_account, 1)","ref":"Account.html#operation/2","title":"Account.operation/2","type":"function"},{"doc":"Get a ordered list of all the operations that happen on a given date, ordered by occurence date timeExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000}}) iex&gt; {:ok, new_account, _} = Account.withdraw(init_account, %{amount: 700, currency: :BRL, date_time: ~U[2020-07-24 11:00:00Z]}) iex&gt; {:denied, _, new_account, _} = Account.withdraw(new_account, %{amount: 1300, currency: :BRL, date_time: ~U[2020-07-24 12:00:00Z]}) iex&gt; {:ok, new_account, _} = Account.deposit(new_account, %{amount: 700, currency: :BRL, date_time: ~U[2020-07-25 11:00:00Z]}) iex&gt; [ ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 1300, currency: :BRL}, status: :denied}, ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 700, currency: :BRL}, status: :done} ...&gt; ] = Account.operations(new_account, ~D[2020-07-24])","ref":"Account.html#operations/2","title":"Account.operations/2","type":"function"},{"doc":"Get a ordered list of all the operations that happen between 2 dates, ordered by occurence date timeExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000}}) iex&gt; {:ok, new_account, _} = Account.withdraw(init_account, %{amount: 700, currency: :BRL, date_time: ~U[2020-07-24 11:00:00Z]}) iex&gt; {:denied, _, new_account, _} = Account.withdraw(new_account, %{amount: 1300, currency: :BRL, date_time: ~U[2020-07-24 12:00:00Z]}) iex&gt; {:ok, new_account, _} = Account.deposit(new_account, %{amount: 700, currency: :BRL, date_time: ~U[2020-07-25 11:00:00Z]}) iex&gt; {:ok, new_account, _} = Account.deposit(new_account, %{amount: 1800, currency: :BRL, date_time: ~U[2020-07-26 11:00:00Z]}) iex&gt; [ ...&gt; %Account.Operation{type: :deposit, data: %{amount: 700, currency: :BRL}, status: :done}, ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 1300, currency: :BRL}, status: :denied}, ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 700, currency: :BRL}, status: :done} ...&gt; ] = Account.operations(new_account, ~D[2020-07-24], ~D[2020-07-25])","ref":"Account.html#operations/3","title":"Account.operations/3","type":"function"},{"doc":"Register an event of refund, update de balance and update the refunded operation statusOnly card operations are refundable, all other operations will return {:error, reason, account_data}Examplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000}}) iex&gt; {:ok, init_account, %{id: op_id}} = Account.card_transaction(init_account, %{amount: 700,currency: :BRL, card_id: 1}) iex&gt; { ...&gt; :ok, ...&gt; %Account{balances: %{BRL: 1000}}, ...&gt; %Account.Operation{type: :refund, data: %{operation_to_refund_id: ^op_id}} ...&gt; } = Account.refund(init_account, %{operation_to_refund_id: op_id})","ref":"Account.html#refund/2","title":"Account.refund/2","type":"function"},{"doc":"Register an event of transfer in and update the balanceExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 300}}) iex&gt; { ...&gt; :ok, ...&gt; %Account{balances: %{BRL: 1000}}, ...&gt; %Account.Operation{type: :transfer_in, data: %{amount: 700, currency: :BRL, sender_account_id: 1}} ...&gt; } = Account.transfer_in(init_account, %{amount: 700, currency: :BRL, sender_account_id: 1})","ref":"Account.html#transfer_in/2","title":"Account.transfer_in/2","type":"function"},{"doc":"Register an event of transfer_out for each data received on the list and update the balanceIf suceeds, the split operation generates N :transfer_out operations on the account operation listIf it is denied, only one operation will be created on the operations listsAll the aditional data passed to data paramenter will be copied to each generated operationExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000}}) iex&gt; { ...&gt; :ok, ...&gt; %Account{balances: %{BRL: 300}}, ...&gt; %Account.Operation{type: :transfer_out, data: %{amount: 700, currency: :BRL}} ...&gt; } = Account.transfer_out(init_account, %{amount: 700, recipient_account_id: 1, currency: :BRL}) iex&gt; init_account = Account.new(%{balances: %{BRL: -500}}) iex&gt; { ...&gt; :denied, ...&gt; reason, ...&gt; %Account{balances: %{BRL: -500}}, ...&gt; %Account.Operation{type: :transfer_out, data: %{amount: 700, currency: :BRL}} ...&gt; } = Account.transfer_out(init_account, %{amount: 700, currency: :BRL, recipient_account_id: 1}) iex&gt; init_account = Account.new(%{balances: %{BRL: 3000}}) iex&gt; data = %{ ...&gt; currency: :BRL, ...&gt; amount: 1000, ...&gt; recipients_data: [ ...&gt; %{percentage: 0.7, recipient_account_id: 2}, ...&gt; %{percentage: 0.2, recipient_account_id: 3}, ...&gt; %{percentage: 0.1, recipient_account_id: 4} ...&gt; ]} iex&gt; { ...&gt; :ok, ...&gt; %Account{balances: %{BRL: 2000}}, ...&gt; [ ...&gt; %Account.Operation{data: %{amount: 100, currency: :BRL, recipient_account_id: 4}}, ...&gt; %Account.Operation{data: %{amount: 200, currency: :BRL, recipient_account_id: 3}}, ...&gt; %Account.Operation{data: %{amount: 700, currency: :BRL, recipient_account_id: 2}} ...&gt; ]} = Account.transfer_out(init_account, data)","ref":"Account.html#transfer_out/2","title":"Account.transfer_out/2","type":"function"},{"doc":"Register an event of withdraw and update account's balanceExamplesiex&gt; init_account = Account.new(%{balances: %{BRL: 1000}}) iex&gt; { ...&gt; :ok, ...&gt; %Account{balances: %{BRL: 300}}, ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 700, currency: :BRL}} ...&gt; } = Account.withdraw(init_account, %{amount: 700, currency: :BRL}) iex&gt; init_account = Account.new(%{balances: %{BRL: -500}}) iex&gt; { ...&gt; :denied, ...&gt; reason, ...&gt; %Account{balances: %{BRL: -500}}, ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 50, currency: :BRL}} ...&gt; } = Account.withdraw(init_account, %{amount: 50, currency: :BRL})","ref":"Account.html#withdraw/2","title":"Account.withdraw/2","type":"function"},{"doc":"Basic struct that represents an AccountThe Account.t() data structure is composed by 5 values:balances: map containing %{currecy =&gt; balance} eg: %{BRL: 2500}limit: The minimal balance required to make operations, this feature only works for account's default currency other currencies are always 0operations: A map containing all the operations of a specific Account. eg %{1 =&gt; Account.Operation.t(), 2 =&gt; Account.Operation.t()}default_currency: Account's default currency used on limit featureoperations_auto_id: Used internally to generate operations ids","ref":"Account.html#t:t/0","title":"Account.t/0","type":"type"},{"doc":"Module responsible for the currency conversion logic and the maintance of the exchange rates tableThe exchange rates are updated hourlyOnly the dollar rates are persisted, all others rates are calculated converting the two currencies to dollars first","ref":"Account.Exchange.html","title":"Account.Exchange","type":"module"},{"doc":"Calculate the exchange equivalent amount between 2 currencies","ref":"Account.Exchange.html#convert/3","title":"Account.Exchange.convert/3","type":"function"},{"doc":"Initialize the module, creating an ETS table and running a server that will update it hourlySince the ETS table is created inside this server, if for whatever reason the rate update fails, all exchange operations will be unavaiable until the ETS table is up to date","ref":"Account.Exchange.html#init/1","title":"Account.Exchange.init/1","type":"function"},{"doc":"Pure functional module, used to define new operations that happen over an Account data structureBy default, any operation is initialized with status :done and with the current date timeIf you want to change any key value of the operation struct you should pass it new value inside the data parameter eg: Account.Operation.new(:type, %{status: :new_status} )","ref":"Account.Operation.html","title":"Account.Operation","type":"module"},{"doc":"Create a new operation based on the parametersAny extra data passed on the data parameter will be part of the final term, inside data keyYou can pass key arguments on data to change operation default values such as :date_time and :statusExamplesiex&gt; oop = Account.Operation.new(:withdraw, %{amount: 1000}) iex&gt; match?(%{date_time: _, type: :withdraw, data: %{amount: 1000}, status: :done}, oop) true #Any extra data passed on the data parameter will be part of the final term iex&gt; oop = Account.Operation.new(:deposit, %{amount: 1000, meta_data: &quot;some data&quot;}) iex&gt; match?(%{data: %{amount: 1000, meta_data: &quot;some data&quot;}}, oop) true # Any key argument on data will change the operation default value for the provided key iex&gt; oop = Account.Operation.new(:deposit, %{amount: 1000, status: &quot;My custom status&quot;, date_time: ~U[2020-07-24 10:00:00Z]}) iex&gt; match?(%{status: &quot;My custom status&quot;, date_time: ~U[2020-07-24 10:00:00Z]}, oop) true","ref":"Account.Operation.html#new/2","title":"Account.Operation.new/2","type":"function"},{"doc":"Basic struct to define an Account.OperationThe Account.Operation.t() data structure is composed by 5 values:date_time: The date and time of the operation occurencetype: Atom that identifies the type of the operationdata: Customized data about the operation based on the operation type, can be used to inject metadata about the operationstatus: Atom that indicates if the operation suceeded or not. [:done, :denied, :refunded]id: Sequential identifier, that identifies the operation only inside an Account context","ref":"Account.Operation.html#t:t/0","title":"Account.Operation.t/0","type":"type"},{"doc":"DynamicSupervisor that manages all Account.Server processes currently running on the systemThis module is used as an Account.Server dicover, always that some part of the system needs to issue requests to an Account.Server, it first asks if some process containing the data of a specific account is already running","ref":"Account.Cache.html","title":"Account.Cache","type":"module"},{"doc":"Get the pid of a Account.Server process that is running with the account's data that has the given id.If the server isn't running it is initialized with the data persisted on database. If no data is already persisted, the server is initialized with the given argsExamplesiex&gt; bob_account_pid = Account.Cache.server_process(1) iex&gt; is_pid(bob_account_pid) true","ref":"Account.Cache.html#run_server_process/2","title":"Account.Cache.run_server_process/2","type":"function"},{"doc":"","ref":"Account.Cache.html#server_process/2","title":"Account.Cache.server_process/2","type":"function"},{"doc":"GenServer that keeps track of an Account data structure as it's state","ref":"Account.Server.html","title":"Account.Server","type":"module"},{"doc":"Get the account id of a specific accountExamplesiex&gt; server_pid = Account.Cache.server_process(123) iex&gt; Account.Server.account_id(server_pid) 123","ref":"Account.Server.html#account_id/1","title":"Account.Server.account_id/1","type":"function"},{"doc":"Get the current balance of the AccountExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 3000}}) iex&gt; Account.Server.balance(server_pid, :BRL) 3000","ref":"Account.Server.html#balance/2","title":"Account.Server.balance/2","type":"function"},{"doc":"","ref":"Account.Server.html#balances/1","title":"Account.Server.balances/1","type":"function"},{"doc":"Debit card operation that uses resources from the account balancesExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 3000}}) iex&gt; { ...&gt; :ok, ...&gt; 1000, ...&gt; %Account.Operation{type: :card_transaction, status: :done, data: %{amount: 2000, currency: :BRL, card_id: 1}}, ...&gt; } = Account.Server.card_transaction(server_pid, %{amount: 2000, currency: :BRL, card_id: 1}) iex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 500}}) iex&gt; { ...&gt; :denied, ...&gt; reason, ...&gt; 500, ...&gt; %Account.Operation{type: :card_transaction, status: :denied, data: %{amount: 2000, currency: :BRL}} ...&gt; } = Account.Server.card_transaction(server_pid, %{amount: 2000, currency: :BRL, card_id: 1})","ref":"Account.Server.html#card_transaction/2","title":"Account.Server.card_transaction/2","type":"function"},{"doc":"Returns a specification to start this module under a supervisor.See Supervisor.","ref":"Account.Server.html#child_spec/1","title":"Account.Server.child_spec/1","type":"function"},{"doc":"Deposit into the account balanceExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 3000}}) iex&gt; { ...&gt; :ok, ...&gt; 5000, ...&gt; %Account.Operation{type: :deposit, status: :done, data: %{amount: 2000, currency: :BRL}} ...&gt; } = Account.Server.deposit(server_pid, %{amount: 2000, currency: :BRL})","ref":"Account.Server.html#deposit/2","title":"Account.Server.deposit/2","type":"function"},{"doc":"Register an exchange operation and update the balances using the current exchange rateExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 3000}}) iex&gt; { ...&gt; :ok, ...&gt; %{BRL: 2000, USD: 183}, ...&gt; %Account.Operation{type: :exchange, status: :done}, ...&gt; } = Account.Server.exchange_balances(server_pid, %{current_amount: 1000, current_currency: :BRL, new_currency: :USD})","ref":"Account.Server.html#exchange_balances/2","title":"Account.Server.exchange_balances/2","type":"function"},{"doc":"Get operation data under the given idExamplesiex&gt; server_pid = Account.Cache.server_process(123) iex&gt; Account.Server.deposit(server_pid, %{amount: 1000, currency: :BRL}) iex&gt; %Account.Operation{ ...&gt; type: :deposit, ...&gt; data: %{amount: 1000, currency: :BRL}, ...&gt; status: :done ...&gt; } = Account.Server.operation(server_pid, 1)","ref":"Account.Server.html#operation/2","title":"Account.Server.operation/2","type":"function"},{"doc":"Get the list of operations that occurred in a specific dateExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 2000}}) iex&gt; Account.Server.withdraw(server_pid, %{amount: 300, currency: :BRL, date_time: ~U[2020-07-23 10:00:00Z]}) iex&gt; Account.Server.withdraw(server_pid, %{amount: 700, currency: :BRL, date_time: ~U[2020-07-24 11:00:00Z]}) iex&gt; Account.Server.withdraw(server_pid, %{amount: 1900, currency: :BRL, date_time: ~U[2020-07-24 12:00:00Z]}) iex&gt; [ ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 1900, currency: :BRL}, status: :denied}, ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 700, currency: :BRL}, status: :done} ...&gt; ] = Account.Server.operations(server_pid, ~D[2020-07-24])","ref":"Account.Server.html#operations/2","title":"Account.Server.operations/2","type":"function"},{"doc":"Get the list of operations that occur betweem 2 dates, ordered by occurence date timeExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 2000}}) iex&gt; Account.Server.withdraw(server_pid, %{amount: 300, currency: :BRL, date_time: ~U[2020-07-23 10:00:00Z]}) iex&gt; Account.Server.withdraw(server_pid, %{amount: 700, currency: :BRL, date_time: ~U[2020-07-24 11:00:00Z]}) iex&gt; Account.Server.withdraw(server_pid, %{amount: 1900, currency: :BRL, date_time: ~U[2020-07-25 12:00:00Z]}) iex&gt; [ ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 700, currency: :BRL}, status: :done}, ...&gt; %Account.Operation{type: :withdraw, data: %{amount: 300, currency: :BRL}, status: :done} ...&gt; ] = Account.Server.operations(server_pid, ~D[2020-07-23], ~D[2020-07-24])","ref":"Account.Server.html#operations/3","title":"Account.Server.operations/3","type":"function"},{"doc":"Register a refund operation, restore the amount to balance and update operation status to :refundedExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 3000}}) iex&gt; Account.Server.card_transaction(server_pid, %{amount: 2000, currency: :BRL, card_id: 1}) iex&gt; { ...&gt; :ok, ...&gt; %{BRL: 3000}, ...&gt; %Account.Operation{type: :refund, status: :done, data: %{operation_to_refund_id: 1}}, ...&gt; } = Account.Server.refund(server_pid, %{operation_to_refund_id: 1})","ref":"Account.Server.html#refund/2","title":"Account.Server.refund/2","type":"function"},{"doc":"Start the Account.Server serverShould not be called directly, instead use Account.Cache.server_process/2The initial state of non persisted non args Account.Server processes is the result of Account.new/0","ref":"Account.Server.html#start_link/1","title":"Account.Server.start_link/1","type":"function"},{"doc":"Deposit into the account balanceExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 3000}}) iex&gt; { ...&gt; :ok, ...&gt; 5000, ...&gt; %Account.Operation{type: :transfer_in, status: :done, data: %{amount: 2000, currency: :BRL}} ...&gt; } = Account.Server.transfer_in(server_pid, %{amount: 2000, currency: :BRL, sender_account_id: 2})","ref":"Account.Server.html#transfer_in/2","title":"Account.Server.transfer_in/2","type":"function"},{"doc":"Transfer resources to another accountsThe version of this functions that receives recipients_data make several operations according to the given list lengthAlthough the list version relies heavily on the simple single recipient implementation, the list call is just syntatic sugar to make multiple single transfersIn case of success there is no differece between multiple single transfers and a single multi tranfer, it is impossible to know after the factThe only difference is in case of denial, because the multi transfer will generate a single operation with all the data, instead of multiple transfersExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 3000}}) iex&gt; { ...&gt; :ok, ...&gt; 1000, ...&gt; %Account.Operation{type: :transfer_out, status: :done, data: %{amount: 2000,currency: :BRL, recipient_account_id: 2}}, ...&gt; %Account.Operation{type: :transfer_in, status: :done, data: %{amount: 2000,currency: :BRL, sender_account_id: 1}} ...&gt; } = Account.Server.transfer_out(server_pid, %{amount: 2000, currency: :BRL, recipient_account_id: 2}) iex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 500}}) iex&gt; { ...&gt; :denied, ...&gt; reason, ...&gt; 500, ...&gt; %Account.Operation{type: :transfer_out, status: :denied, data: %{amount: 2000, currency: :BRL}} ...&gt; } = Account.Server.transfer_out(server_pid, %{amount: 2000, currency: :BRL, recipient_account_id: 2}) iex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 500}}) iex&gt; recipients_data = [ ...&gt; %{percentage: 0.7, recipient_account_id: 2, other_data: &quot;another extra data&quot;}, ...&gt; %{percentage: 0.2, recipient_account_id: 3, meta_data: &quot;specific meta_data&quot;}, ...&gt; %{percentage: 0.1, recipient_account_id: 4} ...&gt; ] iex&gt; { ...&gt; :denied, ...&gt; reason, ...&gt; 500, ...&gt; %Account.Operation{type: :transfer_out, status: :denied, data: %{amount: 2000, currency: :BRL}} ...&gt; } = Account.Server.transfer_out(server_pid, %{amount: 2000, currency: :BRL, recipients_data: recipients_data})","ref":"Account.Server.html#transfer_out/2","title":"Account.Server.transfer_out/2","type":"function"},{"doc":"Withdraw from the account balanceExamplesiex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 3000}}) iex&gt; { ...&gt; :ok, ...&gt; 1000, ...&gt; %Account.Operation{type: :withdraw, status: :done, data: %{amount: 2000, currency: :BRL}} ...&gt; } = Account.Server.withdraw(server_pid, %{amount: 2000, currency: :BRL}) iex&gt; server_pid = Account.Cache.server_process(1, %{balances: %{BRL: 500}}) iex&gt; { ...&gt; :denied, ...&gt; reason, ...&gt; 500, ...&gt; %Account.Operation{type: :withdraw, status: :denied, data: %{amount: 2000, currency: :BRL}} ...&gt; } = Account.Server.withdraw(server_pid, %{amount: 2000, currency: :BRL})","ref":"Account.Server.html#withdraw/2","title":"Account.Server.withdraw/2","type":"function"},{"doc":"Supervisor that manages Database.Worker processes, responsible for data persistence functionality and workers poolingDatabase.worker are used to perform kind of connection pools, spliting the real computational work between all processesThis module works as a connection pool manager, just forwarding the request for a selected workerThis module guarantee that requests that manipulate the same key will always be handled by the same Database.worker process, resulting in no race conditions, because worker processes receives messages sequentiallyInternally, all the real computation is on Database.Worker processes","ref":"Database.html","title":"Database","type":"module"},{"doc":"","ref":"Database.html#child_spec/1","title":"Database.child_spec/1","type":"function"},{"doc":"Get the persisted data registered under the given folder with the given key","ref":"Database.html#get/2","title":"Database.get/2","type":"function"},{"doc":"Start the server","ref":"Database.html#start_link/0","title":"Database.start_link/0","type":"function"},{"doc":"","ref":"Database.html#store_async/3","title":"Database.store_async/3","type":"function"},{"doc":"Persist data asynchronously under the given folder with the given key","ref":"Database.html#store_local_async/3","title":"Database.store_local_async/3","type":"function"},{"doc":"Persist data synchronously under the given folder with the given key","ref":"Database.html#store_local_sync/3","title":"Database.store_local_sync/3","type":"function"},{"doc":"","ref":"Database.html#store_sync/3","title":"Database.store_sync/3","type":"function"},{"doc":"GenServer that handle data persistance requestsThis module is the bottle neck of the system, since the implementation is really naive, and relies just on binary data and the file system, the throughput is not optimalThis module is responsible for 60% of the response time","ref":"Database.Worker.html","title":"Database.Worker","type":"module"},{"doc":"Returns a specification to start this module under a supervisor.See Supervisor.","ref":"Database.Worker.html#child_spec/1","title":"Database.Worker.child_spec/1","type":"function"},{"doc":"Get the persisted data registered under the given folder with the given key","ref":"Database.Worker.html#get/3","title":"Database.Worker.get/3","type":"function"},{"doc":"Callback implementation for GenServer.init/1.","ref":"Database.Worker.html#init/1","title":"Database.Worker.init/1","type":"function"},{"doc":"","ref":"Database.Worker.html#start_link/1","title":"Database.Worker.start_link/1","type":"function"},{"doc":"Persist data asynchronously under the given folder with the given key","ref":"Database.Worker.html#store_async/4","title":"Database.Worker.store_async/4","type":"function"},{"doc":"Persist data synchronously under the given folder with the given key","ref":"Database.Worker.html#store_sync/4","title":"Database.Worker.store_sync/4","type":"function"},{"doc":"Module responsible for gathering system's metrics and persist it on the database","ref":"Metrics.Collector.html","title":"Metrics.Collector","type":"module"},{"doc":"Start the metric's gathering process as a Task","ref":"Metrics.Collector.html#start/0","title":"Metrics.Collector.start/0","type":"function"},{"doc":"GenServer responsible for start the Metrics.Collector task every 5 minutes","ref":"Metrics.Scheduler.html","title":"Metrics.Scheduler","type":"module"},{"doc":"Returns a specification to start this module under a supervisor.See Supervisor.","ref":"Metrics.Scheduler.html#child_spec/1","title":"Metrics.Scheduler.child_spec/1","type":"function"},{"doc":"Initialize the server and schedules the message to be send every 5 minutes","ref":"Metrics.Scheduler.html#init/1","title":"Metrics.Scheduler.init/1","type":"function"},{"doc":"System OverviewThe goal of the system is to be a prototype of how to build a complete banking account management system that allows users to keep track of operations that happen over their account's and make operations like transfers, deposits and refunds.The system is made of 2 basic entities:Account: The basic structure of the system, responsible for hold operations data, balances and the business rules to make everything work properleyAccount.Operation: Basic structure that holds data of an operation such as type, status and custom data like amount and currency, is responsible for the operation's creation rulesAn account has N operations, each one of them has data that identifies what happened in that operation.","ref":"system_overview.html","title":"System Overview","type":"extras"},{"doc":"Requirements: Elixir version &gt;= 1.10Steps:1 - Clone the repository: https://github.com/oliveigah/banking_prototype2 - On terminal, inside repository folder use the following commands: mix deps.get mix test iex -S mix 3 - You are good to go! :D","ref":"system_overview.html#running-the-system","title":"System Overview - Running the system","type":"extras"},{"doc":"You can interact with the system in 2 different ways.The first one is directly via the interactive shell. To do this you can check out the documentarion over the modules section. There you will find a set of examples of how to interact with the system via interactive shell and manage accounts on it.The main functions to start are Account.Cache.server_process/2 which will be used to get the pid of the server you will interact with, and all functions of the Account.Server which will be used to execute all the operations over the account!The second way to interact with the system is by using HTTP requests, this is described on the HTTP page.","ref":"system_overview.html#interacting","title":"System Overview - Interacting","type":"extras"},{"doc":"Accounts can hold balances on multiple currenciesExchange currencies based on the exchange rateMake operations over his own account:DepositWithdrawTransfer to another accountCard transactionRefundsExchange two different currencies balancesAll these operations works with all currencies avaiable on the system, but the exchange has to happen before the operation it self, otherwise it will return &quot;no {currency} funds&quot;A &quot;syntax sugar&quot; that enable multiple transfer being done with a single requestAllows users to give metadata information about the operationsFilter operations over an account by occurrence date time and idSpecial limit that allow account balances go below 0 until a predefined threshold, this feature only works for account's default currency","ref":"system_overview.html#account-features","title":"System Overview - Account Features","type":"extras"},{"doc":"The system has a very simple design that relies on key abstractions of the elixir language such as GenServer, Supervisor and Registry.Some of the technical solutions are admittedly not optimal, but these non optimal parts are usually on side systems like the database and authentication and not part of the core implementation.Below you can see a high level diagram that explain the system component's relations in a non rigorous manner:","ref":"system_overview.html#system-design","title":"System Overview - System Design","type":"extras"},{"doc":"The account data is composed by a simple struct as explained in Account module documentation. @type t() :: %__MODULE__{ balances: map(), limit: integer(), operations: map(), operations_auto_id: integer(), default_currency: atom() }All mapipulations over an account data structure, has to be done as a function call to a predifened function inside Account module. This rule helps to keep the business rules well defined inside a single module that can be read and verified easily, either by new programmers arriving at the project and business experts.This rule enables business experts verify the correctness of the system easier and automated tests being done faster and with less dependencies, for instance look at the code below: def withdraw(%Account{} = account, %{amount: amount, currency: currency} = data) do case remove_balance(account, amount, currency) do {:ok, new_account} -&gt; operation = Account.Operation.new(:withdraw, data) {new_account, operation_data} = register_operation(new_account, operation) {:ok, new_account, operation_data} {:denied, reason} -&gt; operation_custom_data = Map.merge(data, %{message: reason, status: :denied}) operation = Account.Operation.new(:withdraw, operation_custom_data) {new_account, operation_data} = register_operation(account, operation) {:denied, reason, new_account, operation_data} end end defp remove_balance(%Account{} = account, amount, currency) do current_balance = Map.get(account.balances, currency, 0) new_balance = current_balance - amount is_default_currency? = currency === Map.get(account, :default_currency) limit = if is_default_currency?, do: account.limit, else: 0 case new_balance &gt;= limit do true -&gt; new_balances = Map.put(account.balances, currency, new_balance) {:ok, Map.put(account, :balances, new_balances)} false -&gt; {:denied, &quot;No \#{to_string(currency)} funds&quot;} end endAll the code that validates if a withdraw operation can be done or not (business rules) is inside this well defined function with no external dependencies or exoteric programming concepts such as databases, data serialization, pids, etc. All the rules are writen in a very high level code, that uses the account data abstraction that a busniess expert can understand and reason about.Beyond being &quot;business/test friendly&quot; this patten enable all business rules being reusable by any communication platform. For instance, the HTTP platform implemented on this project is just a mean to an end that is interact with the system. Nothing can be done with a HTTP request and not inside the system interactive shell.This design is based on the famous uncle bob's &quot;Clean Architecture&quot; and it's known for decoupling business rules (Account), use cases (Account.Server) and external systems (Database, HTTP).","ref":"system_overview.html#data-representation","title":"System Overview - Data Representation","type":"extras"},{"doc":"With it we can understand the system as an API to create operations over an account, the module Account is a pure functional module used by server process Account.Server to manipulate its own internal state that is an account.Note that the Account.Server is just a representation of a specific account while the Account is a module that is used to handle all specific servers accounts, applying the business rules with the given data.Account.Server implements the interaction between multiple accounts, for instance when a transfer operations happens, the Account.Server that holds the data of the sender account, calls the Account.Server that holds the data of the recipient account.","ref":"system_overview.html#account-server","title":"System Overview - Account Server","type":"extras"},{"doc":"To verify the system performance I've built a simple load test script to test the system. It is based on several assumptions as follows:Premise: 10.000.000 active clientsHypothese 1: Each client make 5 financial operations per day =&gt; 50.000.000 operations per dayHypothese 2: The operations are distributed in a normal fashion, 80% of the operations happens in 20% of the time =&gt; 50M x 0.8 / (24 x 60 x 60 x 0.2) ≈ 2.300 rpsHypothese 3: Just 20% of the clients make a new operation earlier than the cache expire time (240 seconds)To run this test, just execute the following command on terminal inside the project folder: elixir --erl &quot;+P 1000000&quot; -S mix run -e Account.LoadTest.runThe result of this test on my machine is something like this:My machine specs:Intel® Core™ i7-10750H Comet Lake, 12MB CacheRAM 32GB [2x 16GB - Dual Channel] DDR4 (2666 MHZ)SSD M.2 NVME 500GB - [ 2.000 MB/s ]KDE Neon 5.19The test will run in batches of 10.000 requests, the numbers on the left represents the current batch being processed. For each batch a set of metrics will be printed on the terminal:Cache miss time: Average time to execute an operation on a account server that is not already runningCache miss rq/s: Average requests per second if all requests are on account servers that are not already runningCache hit time: Average time to execute an operation on a server that is already runningCache miss rq/s: Average requests per second if all requests are on account servers that are already runningAverage rps: System's requests per second weighted by the hypothese 3Approved: Boolean that verify if the average rps is above the minimal defined on hypothese 2","ref":"system_overview.html#load-test","title":"System Overview - Load Test","type":"extras"},{"doc":"The system is built to be distributed! The distribution implementation is quite naive and conviniently","ref":"system_overview.html#distribution","title":"System Overview - Distribution","type":"extras"},{"doc":"The biggest bottleneck of the system is the database. Due to the naive file system implementation, the database is not good on a concurrent scenario. In a simple test I've verified that the database operations are responsible for more than 60% of the system latency.Beyond that, this conversion to binary implementation will never work on scale because it is copying and reading full data all the time. Instead of just add the new data, each new operation on an account forces a rewrite of all account on the database, and every read has to be a full account data read. This will never work in a scenario when all accounts have 1000+ operations registered.The good news are that both of this problems can be solved with a simple reimplementation of the Database module. Making it use some robust database such as postgres or mongodb, and thanks of how the system is architected, this change should be almost frictionless.","ref":"system_overview.html#bottlenecks","title":"System Overview - Bottlenecks","type":"extras"},{"doc":"Although this system would work great once the new database solution is implemented, it is still only functional on a single BEAM instance scenario. The next step of this project is to bring this system to be able to run on several BEAM clusters, using global registration instead of the built in Registry abstraction.","ref":"system_overview.html#next-steps","title":"System Overview - Next Steps","type":"extras"},{"doc":"WIP - HTTP RoutesPostman Collection","ref":"http_routes.html","title":"WIP - HTTP Routes","type":"extras"},{"doc":"WIP - Design ChoicesAccounts's operations data structure representationMulti transfer success x failed operations registerExchange rates ETS table update vinculation with schedulingOverwrite of key values on operationsDistributed scalabe account cacheLazy account server process initializationCall x Cast on account server data persistanceDatabase workers pooling","ref":"design_choices.html","title":"WIP - Design Choices","type":"extras"}]